import {useEffect, useState}  from 'react';

import './App.css';

function App() {

  const [user, setUser] = useState('');
  const [repo, setRepo] = useState('');
  const [contributors, setContributors] = useState([]);

  useEffect(()=>{
      fetch("https://api.github.com/repos/njorogefaith132/Calculator/contributors?q=contributions&order=desc")
      .then(res=> res.json() )
      .then(data => {
         console.log(data)
      })
  
  }, [])

  const repoChange =(e) =>{
    setRepo(e.target.value);
  }

  const userChange = e =>{
    setUser(e.target.value)
  }
  
  const onrepoSubmit = (e) =>{
    e.preventDefault();
    fetch(`https://api.github.com/repos/${user}/${repo}/contributors?q=contributions&order=desc`)
    .then(res=> res.json() )
    .then(data => {
      setContributors(data);
    }).catch(error =>{
      console.log(error)
    });
  }
  return (
    <div className="App" >
    <form onSubmit={onrepoSubmit}>
         <input type="text" className="inputs" onChange={userChange} />
         <input type="text" className="inputs" onChange={repoChange} />
         <button className="btn btn-warning">Submit</button>
    </form>
    <div className="user-list">
      <h3>List of Contributors</h3>
<div className="lists">

    {
      contributors.map((contributor, index) =>{
        return(
          <div key={index} className="list" >
            
              <p>{contributor.login}</p>

           

          </div>
        )
      })
    }
</div>
    </div>
    </div>
  );
}

export default App;
