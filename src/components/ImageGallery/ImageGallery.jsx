import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getSearchImages } from '../../services/getImages';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';

const scroll = Scroll.animateScroll;
export default class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    let { page } = this.props;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      getSearchImages(nextQuery, page)
        .then(images =>
          this.setState({ images: images.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevProps.page !== page && page > 1) {
      this.setState({ status: 'pending' });
      getSearchImages(nextQuery, page)
        .then(images => {
          this.setState({
            images: [...this.state.images, ...images.hits],
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      this.scrollToBottom();
    }
  }
  scrollToBottom = () => {
    scroll.scrollMore(1200);
  };

  render() {
    const { status, images } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.titleWrapper}>
          <h1>What are we looking for?</h1>
        </div>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected' || images.length === 0) {
      return toast.error('No results', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                onClick={() => this.props.getLargeImg(largeImageURL, tags)}
              />
            ))}
          </ul>
          {images.length !== 0 && <Button onClick={this.props.loadMoreBtn} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  loadMoreBtn: PropTypes.func.isRequired,
  getLargeImg: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
