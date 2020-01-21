import React, { Component } from 'react'
import axios from 'axios'
import Titles from './Titles'
import Popup from 'reactjs-popup'
import './Search.css';
import { Container, Row, Col } from 'reactstrap';



const API_URL = "http://www.omdbapi.com/"
const Api_Key = '315d141e'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            details: [],
            actors: '',
            popup: false
        }
    }
    getInfo = (e) => {
        axios.get(`http://www.omdbapi.com/?apikey=${Api_Key}&s=${this.state.query}`)
            .then(data => {
                console.log(data)
                console.log(data.data.Search)
                this.setState({
                    results: data.data.Search
                })
            })
            .catch(err => { console.log(err) })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }
    getMovieDetails = (id) => e => {
        axios.get(`http://www.omdbapi.com/?apikey=${Api_Key}&i=${id}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    details: response.data,
                    popup: true
                })
                console.log(this.state.details)

            })
            .catch(err => { console.log(err) })
    }
    handleClose = () => {
        this.setState({
            popup: false
        });
    }
    render() {
        console.log(this.state.details)
        const options = this.state.results.map((r, index) => (
            <Col key={index} className="lg-3">
                <li className='container container-list' key={index}>
                    <div className='row'>
                        <div className="col-lg-4 col-md-12 mb-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={r.Poster} alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{r.Title}</h5>
                                    <p className="card-text">{r.Year}</p>
                                    <button className='btn btn-dark' data-toggle="modal" data-target="#exampleModalLong" onClick={this.getMovieDetails(r.imdbID)}>More Details..</button>
                                </div>

                            </div></div>
                    </div></li>
            </Col>
        ))

        return (<React.Fragment>
            {this.state.popup ?
                <div className='full-screen-modal-plan'>
                    <Popup/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 card card-body">
                                <img className="w-100 mb-2" src={this.state.details.Poster} alt="Poster" />
                                <h2 className="mb-4">  </h2> <strong><h2>{this.state.details.Title}</h2></strong>
                            </div>
                            <div className="col-md-8">
                                    <ul className="list-group">
                                    <li className='list-group-item'>
                                    <button className="btn btn-info" onClick={this.handleClose}>
                                        <span className='glyphicon glyphicon-remove'/>X
                                    </button>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Genre:</strong> {this.state.details.Genre}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Released:</strong> {this.state.details.Released}
                                    </li>

                                    <li className="list-group-item">
                                        <strong>Director:</strong> {this.state.details.Director}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Writer:</strong> {this.state.details.Writer}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Actors:</strong>{this.state.details.Actors}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Runtime:</strong> {this.state.details.Runtime}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Rated:</strong> {this.state.details.Rated}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Country:</strong> {this.state.details.Country}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Plot:</strong>{this.state.details.Plot}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Awards:</strong> {this.state.details.Awards}
                                    </li>
                                    <li className="list-group-item">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> :
                <center>

                    <input className='text-box'
                        placeholder='Search for...'
                        ref={input => this.search = input}
                        onChange={this.handleInputChange} >
                    </input>
                    <button onClick={this.getInfo}><i class="fa fa-search" aria-hidden="true"></i>Search</button><br />
                    <div className='container'>
                        <div className='row'>
                            <div className='option'>
                                {options}
                            </div>
                        </div>
                    </div>


                </center>
            }
        </React.Fragment>
        )
    }
}
export default Search