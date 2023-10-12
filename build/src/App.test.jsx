import { render } from "@testing-library/react";
import App from "./App";
import React from 'react'

describe('True or False', () => {
    it('true to be true', () => {
      
      expect(true).toBe(true);
    });
  
    it('false to be false', () => {
      expect(false).toBe(false);
    });
  });