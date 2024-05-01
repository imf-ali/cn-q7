import { useEffect, useState } from 'react';
import AlbumList from './components/AlbumList';
import Header from './components/Header';
import Modal from './components/Modal';
import { getAlbumThunk } from './context/album';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [albumItem, setAlbumItem] = useState(null);

  useEffect(() => {
    dispatch(getAlbumThunk());
  },[])

  return (
    <>
      <Header />
      <AlbumList 
        setShowModal={setShowModal} 
        setAlbumItem={setAlbumItem} 
      />
      {showModal && (
        <Modal 
          albumItem={albumItem} 
          setAlbumItem={setAlbumItem} 
          setShowModal={setShowModal} 
        />
      )}
    </>
  );
}

export default App;
