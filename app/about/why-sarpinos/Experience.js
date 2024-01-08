const Experience = ({ data, experienceImage }) => {
  return (
    <section className="page-container">
      <div className="responsive-column-container" style={{padding: '2rem 0'}}>
          <div>
            <h2>{data.acf.experience_headline}</h2>
            {data.acf.experience_paragraph}
          </div>
          <div>
            <video controls poster={experienceImage.sourceUrl} 
            style={{width: '100%'}}>
              <source src={data.acf.video_upload} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
      </div>
    </section>
  )
}

export default Experience;