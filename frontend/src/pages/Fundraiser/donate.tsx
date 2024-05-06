/**
 * This file contains the implementation of the FundraiserComponent, which is a React functional component.
 * It displays a list of fundraisers and allows users to donate to a selected fundraiser.
 * The component fetches the fundraisers from an API and updates the current amount of the selected fundraiser upon donation.
 * It also initiates the payment process using Stripe for the selected fundraiser.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './donate.scss';
import { loadFundraisers } from '../../store/slice/donationSlice';
import { useDispatch, useSelector } from "react-redux";
import { Fundraiser } from '../../models/fundriaser';
import { getAllFundraisers } from '../../store/slice/donationSlice';

const API_URL = "http://localhost:3000/";

/**
 * The FundraiserComponent displays a list of fundraisers and allows users to donate to a selected fundraiser.
 */
const FundraiserComponent: React.FC = () => {
  const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [selectedFundraiser, setSelectedFundraiser] = useState<Fundraiser | null>(null);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const fundraisers = useSelector(getAllFundraisers())

  useEffect(() => {
    /**
     * Fetches the fundraisers from the API and updates the state with the fetched data.
     */
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get<Fundraiser[]>(API_URL + 'fundraisers');
        dispatch(loadFundraisers(response.data));
      } catch (error) {
        console.error('Error fetching fundraisers:', error);
      }
    };
    fetchFundraisers();
  }, [dispatch]);

  /**
   * Calculates the progress of a fundraiser based on the current amount and goal amount.
   * @param currentAmount - The current amount raised for the fundraiser.
   * @param goalAmount - The goal amount to be raised for the fundraiser.
   * @returns The progress percentage of the fundraiser.
   */
  const calculateProgress = (currentAmount: number, goalAmount: number) => {
    return (currentAmount / goalAmount) * 100;
  };

  /**
   * Handles the payment process for the selected fundraiser.
   * Updates the current amount of the selected fundraiser and initiates the payment process using Stripe.
   */
  const handlePay = async () => {
    if (selectedFundraiser) {
      try {
        // Update currentAmount of the selected fundraiser
        const updatedCurrentAmount = selectedFundraiser.currentAmount + donationAmount;
        await axios.put(`${API_URL}fundraisers/${selectedFundraiser._id}`, { ...selectedFundraiser, currentAmount: updatedCurrentAmount });

        // Initiate payment process using Stripe
        const stripe = await loadStripe("pk_test_51P5x5RRsaab1qXWYYQV28RTTFFK0yZj6iSMC0MafqKkGQLseKWKcl7d0ssGNQ6xDmSIy9voL19NzqY7M1wgnpfEv00GxMEhQBK");
        const sessionResponse = await fetch('http://localhost:3000/payment/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            products: [{ name: selectedFundraiser.title, price: donationAmount }],

          })
        });
        const session = await sessionResponse.json();
        await stripe?.redirectToCheckout({ sessionId: session.id });

        // Close the donate modal
        setOpenDonateModal(false);
      } catch (error) {
        console.error('Error paying for fundraiser:', error);
      }
    }
  };

  return (
    <div className="container" data-aos="fade-up">
      <h1 className="header">{t('Fundraisers')}</h1>
      {fundraisers.map((fundraiser) => (
        <Card className="card" key={fundraiser._id}>
          <CardContent className="card-content">
            <Typography variant="h5" component="h2" className="title">
              {fundraiser.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom className="description">
              Description: {fundraiser.description}
            </Typography>
            <div className="amount-section">
              <Typography color="textSecondary">
                <span style={{ fontWeight: 'bold' }}>{t('Current Amount')}: $ {fundraiser.currentAmount}</span>
              </Typography>
              <Typography color="textSecondary">
                <span style={{ fontWeight: 'bold' }}>{t('Goal Amount')}: $ {fundraiser.goalAmount}</span>
              </Typography>
            </div>
            <div className="progress-bar">
              <div className="progress-indicator" style={{ width: `${calculateProgress(fundraiser.currentAmount, fundraiser.goalAmount)}%` }}></div>
            </div>
            <br />
            <Button onClick={() => { setSelectedFundraiser(fundraiser); setOpenDonateModal(true); }} variant="outlined" color="primary" className="donate-button">{t('Donate')}</Button>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openDonateModal} onClose={() => setOpenDonateModal(false)}>
        <DialogTitle>{t('Donate to')} {selectedFundraiser?.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="donationAmount"
            label="Donation Amount"
            type="number"
            fullWidth
            value={donationAmount}
            onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDonateModal(false)}>Cancel</Button>
          <Button onClick={handlePay} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FundraiserComponent;


