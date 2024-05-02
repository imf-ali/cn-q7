import { useDispatch, useSelector } from "react-redux";
import { albumState, deleteAlbumThunk } from "../context/album";
import styles from '../App.module.css';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

const AlbumList = ({ setShowModal, setAlbumItem }) => {
  const { albums } = useSelector(albumState);
  const dispatch = useDispatch();

  const onEditClick = (album) => {
    setAlbumItem(album);
    setShowModal(true);
  }

  const onDeleteClick = (album) => {
    dispatch(deleteAlbumThunk({ id: album.id }));
  }

  return (
    <>
      <div className={styles.albumList}>
        {albums.map((album, ind) => (
          <div key={ind} className={styles.albumItem}>
            <div className={styles.title}>{album.title}</div>
            <div className={styles.iconDiv}>
              <img onClick={() => onEditClick(album)} src={editIcon} />
              <img onClick={() => onDeleteClick(album)} src={deleteIcon} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonDiv}>
        <button onClick={() => setShowModal(true)}>Add new album</button>
      </div>
    </>
  );
}

export default AlbumList;