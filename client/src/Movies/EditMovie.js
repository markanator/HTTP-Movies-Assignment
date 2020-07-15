import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams,useHistory} from "react-router-dom";

function EditMovie(props) {
    const {id} = useParams();
    const {push} = useHistory();

    const [item, setItem] = useState({
        id,
        title: '',
        director: '',
        metascore: 0,
        stars: [],
    });

    // const {stars} = item;

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // console.table(res.data);
                setItem(res.data);
            }) // set item to response.data
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const starsHandler = (ev,ind) => {
        ev.persist();

        // create copy of array
        let actors = [...item.stars];

        // edit array[index] of copied array
        actors[ind] = ev.target.value; 

        // set OG array to updated array
        setItem({
            ...item,
            stars: actors
        });
    };
    
    const handleSubmit = e => {
            e.preventDefault();
            // make a PUT request to edit the item
            axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                console.log("API response", res.data);
                props.getMovieList();
                push('/');
            })
            .catch(err => console.error(err));
    };

    return ( 
        <div className='edit-page'>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'> Title: </label>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={item.title}
                />
                <div className="baseline" />

                <label htmlFor='director'> Director: </label>
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={item.director}
                />
                <div className="baseline" />

                <label htmlFor='metascore'> MetaScore: </label>
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={item.metascore}
                />
                <div className="baseline" />

                <h3>Actors:</h3>
                {item.stars.map((actor,i)=>(
                        <input
                        key={i}
                        type='text'
                        name={actor}
                        onChange={(ev)=>starsHandler(ev,i)}
                        placeholder="actor"
                        value={item.stars[i]}
                        />
                    ))
                }

                <br /><button className="md-button form-button">Update</button>
            </form>
    </div>
    );
}

export default EditMovie;