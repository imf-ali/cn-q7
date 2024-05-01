import { useState } from 'react';
import styles from '../App.module.css';
import { useDispatch } from 'react-redux';
import { addAlbumThunk, updateAlbumThunk } from '../context/album';

const Modal = ({ setShowModal, albumItem, setAlbumItem }) => {
  const [title, setTitle] = useState(albumItem? albumItem.title : '');
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    if(!albumItem)
      dispatch(addAlbumThunk({ title }));
    else dispatch(updateAlbumThunk({ title, id: albumItem.id }));
    setShowModal(false);
  }

  const cancelModal = () => {
    setAlbumItem(null);
    setShowModal(false);
  }
  return (
    <>
      <div className={styles.backdrop} onClick={cancelModal} />
      <div className={styles.modal}>
        <label>{!albumItem ? 'Name of album' : 'Edit the album'}</label>
        <input
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          type="text" 
          placeholder="Enter the album name" 
        />
        <button onClick={onSubmitHandler}>Add</button>
      </div>
    </>
  );
}

export default Modal;