import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    showModal: false,
    modalImg: '',
    tags: '',
  };

  onSearchSubmit = searchQuery => this.setState({ searchQuery, page: 1 });

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ modalImg: largeImageURL, tags });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchQuery, page, tags, showModal, modalImg } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchSubmit} className="Searchbar" />
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          loadMoreBtn={this.loadMoreBtn}
          getLargeImg={this.getLargeImg}
        />
        {showModal === true && (
          <Modal toggleModal={this.toggleModal}>
            <img src={modalImg} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
