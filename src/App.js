import { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';
import Spinner from './components/Spinner/Spinner';
import GeneratedImage from './components/GeneratedImage/GeneratedImage';
import Form from './components/Form/Form';

function App() {

  const [text, setText] = useState('');
  const [size, setSize] = useState('small');

  const [spin, setSpin] = useState(false);
  const [imgURL, setimgURL] = useState('');
  const [showImg, setShowImg] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (text === '') {
      alert("Please Enter some text to generate the image!")
      return
    }

    setShowImg(false)
    setSpin(true)

    getImage(text, size);

  }

  const getImage = async (text, size) => {

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: size === 'small' ? '256x256' : size === 'medium' ? '512x512' : "1024x1024",
    });

    const image_url = response.data.data[0].url;

    setSpin(false);
    setText('');
    setimgURL(image_url);
    setShowImg(true);

  }

  return (
    <>
      {spin ? <Spinner /> : null}

      <div className="main-container container-fluid bg-dark">
        <div className="form-container">
          <h2 className='pb-5'>Enter Text to Generate Image</h2>
          <Form handleSubmit={handleSubmit} text={text} setText={setText} setSize={setSize} />
        </div>
      </div>

      {showImg ? <GeneratedImage img={imgURL} /> : null}

    </>

  );
}

export default App;
