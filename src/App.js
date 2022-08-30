import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import {fetchData, loadData, nextImage, prevImage, setArtId, reset} from './features/dataSlice'

import { useEffect } from 'react';

const mapStateToProps = (state) => ({
  artId: state.data.artId
})

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  useEffect(() => {
    dispatch(fetchData())
  },[props.artId, dispatch])

    const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(reset())}>Clear</button>
        <button onClick={() => dispatch(nextImage())}>Next</button>
        <button onClick={() => dispatch(prevImage())}>Back</button>
      </div>
      <input value={ data.artId } onChange={(e) => {
        dispatch(setArtId(Number(e.target.value)))
      }} />
      <div>
        {data.artId}
        {renderImg()}
      </div>
    </div>

  );
}

export default connect(mapStateToProps)(App);

