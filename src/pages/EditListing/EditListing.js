import { Button, FormControl, FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { FaArrowCircleRight, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  getListingById,
  updateListing
} from '../../redux/slices/listings/listingsSlice';

import Loader from '../../components/Loader';
import RentLeaseForm from '../NewListingPage/RentLeaseForm';
import SellApartmentForm from '../NewListingPage/SellApartmentForm';
import SellProjectForm from '../NewListingPage/SellProject';
import { listingKeys } from '../../constants/listingTypes';

const EditListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [values, setValues] = useState({});
  let [newPictures, setNewPictures] = useState([]);

  useEffect(() => {
    dispatch(getListingById({ id, setValues }));
  }, [dispatch, id, setValues]);

  let loading =
    useSelector((state) => state.listings.loading === 'loading') ||
    Object.keys(values).length < 1;

  const handleChange = (prop) => (newVal) => {
    if (newVal.hasOwnProperty('newPictures')) {
      setNewPictures(newVal.newPictures);
    }
    let { newPictures, ...newValP } = newVal;
    setValues({ ...values, [prop]: newValP });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let type = values.type;
    dispatch(
      updateListing({
        navigate,
        listing: { _id: values._id, type, ...values[type], newPictures }
      })
    );
  };

  const handleCancel = (event) => {
    event.preventDefault();

    setValues({});
    navigate(-1);
  };

  return (
    <Box
      sx={{
        p: { xs: 0, md: 5 },
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          marginBottom: 2
        }}>
        Edit listing
      </Typography>
      {!loading && listingKeys.includes(values?.type) && (
        <FormGroup>
          {values.type === 'rentlease' && (
            <RentLeaseForm
              values={values.rentlease}
              onChange={handleChange('rentlease')}
              newPictures={newPictures}
              edit
            />
          )}
          {values.type === 'sellproject' && (
            <SellProjectForm
              values={values.sellproject}
              onChange={handleChange('sellproject')}
              newPictures={newPictures}
              edit
            />
          )}
          {values.type === 'sellapartment' && (
            <SellApartmentForm
              values={values.sellapartment}
              onChange={handleChange('sellapartment')}
              newPictures={newPictures}
              edit
            />
          )}

          <FormControl>
            <Box
              component='div'
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                disabled={loading}
                variant='outlined'
                sx={{ marginRight: 2 }}
                startIcon={<FaTimesCircle />}
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                disabled={loading}
                variant='contained'
                sx={{ textAlign: 'center' }}
                endIcon={<FaArrowCircleRight />}
                onClick={handleSubmit}>
                {loading ? <Loader /> : 'Submit'}
              </Button>
            </Box>
          </FormControl>
        </FormGroup>
      )}
    </Box>
  );
};

export default EditListing;
