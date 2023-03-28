import React from 'react';
import { useState } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import KeywordsModal from './components/KeywordsModal';

const App = () => {
  const [keywords, setKeywords] = useState('');
  const [isOpen, setIsOpen] = useState('');
  const [loading, setLoading] = useState('');
  
  const extractKeyword = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const res = await fetch('https://api.openai.com/v1/chat/completions',{  
    method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Authorisation: `Bearer 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`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: 'Extract keywords from this Text. Make the first letter of each word uppercase and separate with commas\n\n'+ text + '',
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8
      })
    })

    const json = await res.json();

    const data = json.choices[0].text.trim();

    console.log(data);
    setKeywords(data);
    setLoading(false);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
  <Box bg='blue.600' color='white' height='100vh' paddingTop={70}>
    <Container maxW='2xl' centerContent >
  <Header />
  <TextInput extractKeyword={extractKeyword}/>
  <Footer />
  </Container>
  <KeywordsModal keywords={keywords} loading={loading} isOpen={isOpen} closeModal={closeModal} />
  </Box> 
  )
}

export default App;