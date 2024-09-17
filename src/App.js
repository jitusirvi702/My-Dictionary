import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const handleEvent = (event) =>{
    setSearch(event.target.value)
  }

  const fun = async (event) =>{
   event.preventDefault();
   if(search){
    try{
      const get = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);
      const jdata = await get.json()
      console.log(jdata)
      setData(jdata[0])
   }
   catch (error) {
    console.error("Error fetching data:", error);
  }
} else {
  console.error("Search term is empty");
}
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Dictionary</h1>
      </header>
      <main className="App-main">
        <form className='Myform' onSubmit={fun}>
          <input type='text' placeholder='Enter word' onChange={handleEvent} />
          <button type='submit'>Submit</button>
          <div>
          {
            data ?
            <div className='datas'>
              <h3>Word: {data.word}</h3>
              <p>Part of speech: {data.meanings[0].partOfSpeech}</p>
              <p>Definition: {data.meanings[0].definitions[0].definition}</p>
              <p>Synonyms: {data.meanings[0].synonyms[0]} </p>
              <p>Example: {data.meanings[0].definitions[0].example}</p>
              <button className='rd' onClick={() => window.open(data.sourceUrls[0],"_blank")}>Read More</button>
            </div>
            :
            ""
          }
        </div>
        </form>
      </main>
      <footer className='App-footer'>
        <p>@Copyright by My Dictionary</p>
      </footer>
    </div>
  );
}

export default App;
