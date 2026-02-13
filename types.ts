import React from 'react';

export interface HeartProps {
  id: number;
  style: React.CSSProperties;
}

export enum ProposalState {
  INPUT_NAME = 'INPUT_NAME',
  ASKING = 'ASKING',
  ACCEPTED = 'ACCEPTED',
}

export interface ButtonConfig {
  scale: number;
  x: number;
  y: number;
  text: string;
}