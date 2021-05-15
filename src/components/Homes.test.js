import React from 'react';
import { render, act, getAllByTestId, getNodeText } from '@testing-library/react';

import Homes from './Homes';
import apiClient from '../services/apiClient';
import bookingDialogService from '../services/bookingDialogService';

let container = null;

beforeEach(async () => {
  jest.spyOn(apiClient, 'getHomes').mockImplementation(() => {
    return Promise.resolve([
      {
        title: "Test home 1",
        image: "listing.jpg",
        location: "Test location 1",
        price: "1",
      },
      {
        title: "Test home 2",
        image: "listing.jpg",
        location: "Test location 2",
        price: "2",
      },
      {
        title: "Test home 3",
        image: "listing.jpg",
        location: "Test location 3",
        price: "3",
      }
    ]);
  });
  container = render(<Homes />).container;
  await act(async () => { })
});

it('should render home', () => {
  expect(getAllByTestId(container, 'home')).toBeTruthy();
});

it('should render home title', () => {
  const titles = getAllByTestId(container, 'home-title');
  expect(getNodeText(titles[0])).toBe('Test home 1');
});

it('should render home image', () => {
  const images = getAllByTestId(container, 'home-image');
  expect(images[0]).toBeTruthy();
});

it('should render home location', () => {
  const locations = getAllByTestId(container, 'home-location');
  expect(getNodeText(locations[0])).toBe('Test location 1');
});

it('should render home price', () => {
  const prices = getAllByTestId(container, 'home-price');
  expect(getNodeText(prices[0])).toBe('$1/night');
});

it('should render home booking button', () => {
  const homeBookingButtons = getAllByTestId(container, 'home-booking-btn');
  expect(homeBookingButtons[0]).toBeTruthy();
});

it('should open home book dialog when clicking the button', () => {

  jest.spyOn(bookingDialogService, 'open').getMockImplementation(() => {

  })

  const homeBookingButtons = getAllByTestId(container, 'home-booking-btn');
  homeBookingButtons[0].click();

  expect(bookingDialogService.open).toHaveBeenCalledWith({
    title: "Test home 1",
    image: "listing.jpg",
    location: "Test location 1",
    price: "1",
  });
});

