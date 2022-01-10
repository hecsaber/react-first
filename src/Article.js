import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const [ content, setContent ] = useState();
  const { slug } = useParams();

  useEffect(() => {
    fetch(`/article/${slug}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(value => setContent(value))
  }, [slug]
  )

  return (
    <div>
      <h1>
        {content ? content.title : "No article here"}
      </h1>
      <p>
        {content ? content.description : "No description here"}
      </p>
    </div>
  )
}

export default Article;