
import React from 'react'
import {Carousel,  Item } from 'react-elastic-carousel'
import img1 from './../images/img1.jpg'
import img2 from './../images/img2.jpg'
import img3 from './../images/img3.jpeg'

export default function Crousel() {


    return (
        <Carousel itemsToShow={1}>
            <Item>{img1}</Item>
            <Item>{img2}</Item>
            <Item>{img3}</Item>

        </Carousel>
    )
}
