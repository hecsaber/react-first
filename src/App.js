import './App.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function App() {
  const [userEmail, setUserEmail] = useState();
  const [pass, setPass] = useState();
  const [members, setMembers] = useState([]);
  const [loginFailed, setLoginFailed] = useState();

  const onChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if (fieldName === 'email') {
      setUserEmail(fieldValue);
    } else if (fieldName === 'password') {
      setPass(fieldValue);
    };
  }

  const body = {
    user: {
      email: userEmail,
      password: pass
    }
  }

  const onSubmit = (event) => {

    event.preventDefault();
    fetch("/api/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)}
    ).then(response => {
      console.log(response);
      if (response.ok) {
        setAuthorize(response.headers.get("Authorization"))
        return response.json();
      } else if (response.status === 401) {
        setLoginFailed(true);
      }
      throw new Error("Network response was not ok.");
    }
    ).then(data => {
      console.log(data)
    }
    ).catch(err => console.log(err))
  }

  const [authorize, setAuthorize] = useState();

  const onLogin = (event) => {
    fetch("/api/rest-area", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorize
      }}
    ).then(response => response.json()
    ).then(result => console.log(result)
    ).catch(err => console.log(err))
  }

  const [article, setArticle] = useState();
  const articleLinks = article && article.map((single, index) => (
      <Link key={index} to={`article/${single.slug}`}>{single.title}</Link>
    ))
  
  useEffect(() => {
    fetch("/api/member-data", {
      method: "GET"
    })
      .then(response => response.json())
      .then(result => setMembers(result))

    fetch("/api/articles", {
      method: "GET"
    })
      .then(response => response.json())
      .then(result => setArticle(result))
  }, [])

  const jsxMember = members.map((member, index) => (
      <div key={index}>
        {member.email}
      </div>
    )
  );

  const signOut = (event) => {
    fetch("/api/users/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorize
      }}
      ).then(res => res.json()
      ).then(value => console.log(value)
      ).catch(err => console.log(err))
  }

  const failedLoginText = (
    <div>
      your email or password was not good
    </div>
  )

  return (
    <div className="App">
      <form onSubmit={ onSubmit }>
        <input
          name="email"
          type="email"
          onChange={ onChange }
        />
        <input
          name="password"
          type="password"
          onChange={ onChange }
          />
        <button type="submit">
          Go
        </button>
      </form>
      {loginFailed && failedLoginText}
      <div>
        {jsxMember.length > 0 ? jsxMember : "0"}
      </div>
      <button
        onClick={ onLogin }
      >
        GO
      </button>
      <button
        onClick={ signOut }
      >
        sign out
      </button>
      <Link to="/">Home</Link>
      {articleLinks}
    </div>
  );
}

export default App;
