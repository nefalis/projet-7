import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneLogement } from '../../api/api';

import Carousel from "../../components/carousel/Carousel"
import Tag from "../../components/tag/Tag"
import Rating from "../../components/rating/Rating"
import DropDown from "../../components/dropDown/DropDown"
import Error from "../../pages/Error/Error"
import "../Logement/logement.css"


const Logement = () => {
    const { id } = useParams();
    const [logement, setLogement] = useState({})
    const [load, setLoad] = useState(false)


    //console.log(logement);

    useEffect(() => {
        // Une promesse pour bien attendre que les données arrivent
        getOneLogement(id)
            .then(data => {
                setLogement(data)
                setLoad(true)      // Une fois les data récupérée on met le flag à true
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    if (!load) {
        return <div>Loading ....</div>
    }
    if (!logement) {
        return <Error />
    }


    return (

        <main className='logementPage'>



            <div className='carouselLogement'>

                <Carousel
                    pictures={logement.pictures}
                    alt={logement.title}
                />

            </div>

            <div className='profilLogement'>

                <div className='detailLogement' >

                    <h2>{logement.title}</h2>
                    <p> {logement.location}</p>



                    <div className='tagLogement'>
                        {logement.tags.map((tag) => {
                            return (
                                <Tag
                                    tag={tag} key={tag}
                                />

                            )
                        })}
                    </div>

                </div>
                <div className='hostRate'>
                    <div className='host'>
                        <p>{logement.host.name}</p>
                        <img src={logement.host.picture} alt={logement.host.name} ></img>
                    </div>

                    <div className='rate'>
                        <Rating
                            rate={logement.rating}
                        />
                    </div>
                </div>
            </div>

            <div className='dropDown'>

                <DropDown
                    title={"Description"}
                    content={logement.description}
                />

                <DropDown
                    title={"Équipements"}
                    content={logement.equipments}

                />
            </div>

        </main>
    )
}

export default Logement;

/*
<DropDown
    title={"Équipements"}
    content={logement.equipements.map((equipement, index) => {
    key={index} equipement={equipement}
    }
    )}
/>      
*/

/*
<div className='equipementDrop'>
                    title={"Équipements"}
                    content={logement.equipements.map((equipement, index) => {
                        return (
                            <DropDown
                                key={index} equipement={equipement}
                            />
                        )
                    }

                    )}

                </div>
*/

/*
<DropDown
                    title={"Équipements"}
                    content={logement.equipements}

                />
*/

/*
<DropDown
                    title={"Équipements"}
                    content={logement.equipements.map((equipement, index) => {
                        <li key={index}>{equipement}</li>

                    })}
                />
*/

/*
<DropDown
                    title={"Équipements"}
                    content={logement.equipements.map((equipement, index) => {
                        return (
                            <li key={index}>{equipement}</li>
                        )
                    }
                    )}
                />
*/

/*
  <DropDown title={"Équipements"}>
                    <ul>
                        {logement.equipements.map((equipement) => {
                            return (
                                <li key={equipement}></li>
                            )
                        }
                        )}
                    </ul>
                </DropDown>
*/ 