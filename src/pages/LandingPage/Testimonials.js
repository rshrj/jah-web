import {
  Box,
  Button,
  Container,
  Pagination,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TestimonialCard from './TestimonialCard';
import { getTestimonials } from '../../redux/slices/testimonials/testimonialsSlice';

let sample = {
  message:
    'They provided stellar service and left me spell bound. Will definitely choose again',
  name: 'John Doe',
  company: 'Web Space Inc.'
};

const num = 3;

const Testimonials = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  let testimonials = useSelector((state) => state.testimonials.content);
  let loading = useSelector(
    (state) => state.testimonials.fetchLoading === 'loading'
  );

  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 5,
            px: { xs: 0, sm: 15 },
            marginBottom: 3
          }}>
          <Button
            variant='outlined'
            size='small'
            sx={{
              visibility: 'hidden',
              display: { xs: 'none', sm: 'block' }
            }}>
            Submit Testimonial
          </Button>
          <Box sx={{}}>
            <Typography
              textAlign='center'
              variant={isPhone ? 'h4' : 'h3'}
              color='primary.main'
              sx={{ marginBottom: 1 }}>
              Notes from our clients
            </Typography>
            <Typography
              textAlign='center'
              variant={isPhone ? 'subtitle1' : 'h6'}
              color='text.secondary'>
              Our work speaks for itself. Read the happy notes from our clients.
            </Typography>
          </Box>
          <Button
            variant='outlined'
            size='small'
            sx={{
              marginTop: { xs: 2, sm: 0 }
            }}
            component={RouterLink}
            to='/submittestimonial'>
            Submit Testimonial
          </Button>
        </Box>
        {loading && (
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              px: { xs: 0, sm: 15 }
            }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 'bold',
                color: 'grey.500',
                textAlign: 'center',
                mb: 3
              }}>
              Loading...
            </Typography>
          </Box>
        )}
        {!loading && testimonials.ids.length === 0 && (
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              px: { xs: 0, sm: 15 }
            }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 'bold',
                color: 'grey.500',
                textAlign: 'center',
                mb: 3
              }}>
              No Testimonials at the moment :&#40;
            </Typography>
          </Box>
        )}
        {!loading && testimonials.ids.length > 0 && (
          <>
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                px: { xs: 0, sm: 15 }
              }}>
              {testimonials.ids
                .slice(num * (page - 1), num * page)
                .map((id) => (
                  <TestimonialCard
                    message={testimonials.testimonials[id].message}
                    name={testimonials.testimonials[id].name}
                    company={testimonials.testimonials[id].company}
                  />
                ))}
            </Box>
            {testimonials.ids.length > num && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                  mb: 5
                }}>
                <Pagination
                  count={Math.ceil(testimonials.ids.length / num)}
                  page={page}
                  onChange={handlePageChange}
                  color='primary'
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Testimonials;
