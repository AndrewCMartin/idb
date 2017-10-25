import React from 'react'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const About = () => (
    <div className="container">

        <div className="row">
            <div className="col-lg-12">
                <h2 className="page-header">About</h2>
                <p>About us</p>
            </div>
            <br />
            <br />
            <br />
            <div className="col-lg-4 com-sm-6 text-center">
                <h3>Hannah Anees</h3>
            </div>
            <div className="col-lg-4 com-sm-6 text-center">
                <h3>Tesia Wu</h3>
            </div>
            <div className="col-lg-4 com-sm-6 text-center">
                <h3>Sunaina Krishnamoorthy</h3>
            </div>
            <div className="col-lg-4 com-sm-6 text-center">
                <h3>Andrew Martin</h3>
            </div>
            <div className="col-lg-4 com-sm-6 text-center">
                <h3>Bhavish Yalamanchi</h3>
            </div>
            <div className="col-lg-4 com-sm-6 text-center">
                <h3>Helen Salgi</h3>
            </div>
        </div>
    </div>
);
export default About