import React from 'react'
import ReactMarkdown from 'react-markdown'
import './ImageSection.css'

const ImageSection = ({ title, text, image, id, childComponent }) => (
  <section className="image-section" id={id}>
    <img src={image} alt="" />
    <div className="image-section-text-wrapper">
      <div className="image-section-heading">
      </div>
      {text && (
        <ReactMarkdown
          source={image}
          className="image-section-text"
          linkTarget="_blank"
        />
      )}
    </div>
    <div className="image-section-child-wrapper">{childComponent}</div>
  </section>
)

export default ImageSection
