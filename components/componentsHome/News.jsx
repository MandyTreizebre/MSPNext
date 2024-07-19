import { useState, useEffect } from 'react' 
import { config } from "@/config"
import axios from "axios"
import Link from 'next/link'
import Image from 'next/image'
import Carousel from 'react-multi-carousel' 
import 'react-multi-carousel/lib/styles.css' 
import "@/styles/news.css" 

const News = () => {
    const [news, setNews] = useState([]) 
    const [error, setError] = useState(null) 
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        axios.get('/api/news')
            .then((res) => {
                setNews(res.data) 
                setLoading(false) 
                console.log("res.data suite appel /api/news =>", res.data)
            })
            .catch(err => {
                setError("Une erreur s’est produite lors de la récupération des actualités.", err) 
                setLoading(false) 
            }) 
    }, []) 

    return (
        <section className='container-carousel'>
            <h2>Les actualités santé</h2>
            {loading ? (
                <p>Chargement des actualités</p>
            ) : (
                news.length > 0 && (
                    <Carousel 
                        key={news.length}
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={false}
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        partialVisible
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 3,
                                partialVisibilityGutter: 0
                            },
                            laptop: {
                                breakpoint: { max: 1470, min: 1024 },
                                items: 3,
                                partialVisibilityGutter: 0
                            },
                            mobile: {
                                breakpoint: { max: 767, min: 0 },
                                items: 1,
                                partialVisibilityGutter: 0
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 1,
                                partialVisibilityGutter: 0
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {news.map((item, index) => (
                            <div key={item.id || index}>
                                <section className="box-news">
                                    <Image src={item.picture} className='img-news' alt={item.title} width={500} height={500}/>
                                    <h3>{item.title}</h3>
                                    <p>{item.details}</p>
                                    <Link href={item.external_link} 
                                        target='_blank' 
                                        rel="noopener noreferrer"
                                        aria-label="Visiter la page officielle (s'ouvre dans un nouvel onglet)"
                                        className="news-link"
                                    >
                                        Lire la suite
                                    </Link>
                                </section>
                            </div>
                        ))}
                        {error && <div className="error-message">{error}</div>}
                    </Carousel>
                )
            )}
        </section>
    ) 
}

export default News 