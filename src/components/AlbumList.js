import { useSelector } from "react-redux";
import { albumState } from "../context/album";
import styles from '../App.module.css';
import icon from '../assets/edit.png';

const AlbumList = ({ setShowModal, setAlbumItem }) => {
  const { albums } = useSelector(albumState);
  const onEditClick = (album) => {
    setAlbumItem(album);
    setShowModal(true);
  }

  return (
    <>
      <div className={styles.albumList}>
        {albums.map((album, ind) => (
          <div key={ind} className={styles.albumItem}>
            <div className={styles.title}>{album.title}</div>
            <div className={styles.iconDiv}>
              <img onClick={() => onEditClick(album)} src={icon} />
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