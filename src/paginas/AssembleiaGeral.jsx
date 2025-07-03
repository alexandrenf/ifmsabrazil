import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import MarkdownContent from "../components/MarkdownContent.jsx";
import SponsorsGallery from "../components/SponsorsGallery.jsx";
import Loading from "../components/Loading.jsx";
import { Download, Calendar, MapPin, Users, FileText, Clock, AlertCircle, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(0, 80, 140, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 80, 140, 0);
  }
`;

// Main container
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  
  /* Support dynamic color theming */
  --primary-color: ${props => props.primaryColor || '#00508c'};
  --secondary-color: ${props => props.secondaryColor || '#fac800'};

  @media (max-width: 768px) {
    padding-top: 80px;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa 50%, #ffffff);
    
    /* Enhanced mobile scrolling */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
`;

// Hero section with three-column layout
const HeroSection = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 3rem;
  align-items: start;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 2rem 1rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    gap: 1rem;
  }
`;

// Event logo section (left)
const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInLeft} 1s ease-out 0.2s forwards;
  opacity: 0;

  @media (max-width: 1200px) {
    order: 1;
  }
`;

const EventLogo = styled.div`
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, var(--primary-color, #00508c), var(--primary-color, #003366));
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 80, 140, 0.3);
  position: relative;
  overflow: hidden;
  padding: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 40px;
    background: rgba(255, 255, 255, 1);
    padding: 1rem;
  }

  @media (max-width: 1200px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
    border-radius: 24px;
    box-shadow: 0 15px 30px rgba(0, 80, 140, 0.25);
    margin-bottom: 1rem;
    animation: ${float} 3s ease-in-out infinite;
    
    img {
      border-radius: 16px;
      padding: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 80, 140, 0.2);
    margin-bottom: 0.75rem;
    animation: ${float} 3s ease-in-out infinite;
    
    img {
      border-radius: 12px;
      padding: 0.5rem;
    }
  }
`;

// Main content section (center)
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 1s ease-out 0.4s forwards;
  opacity: 0;

  @media (max-width: 1200px) {
    order: 2;
  }
`;

const EventTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color, #00508c);
  text-align: center;
  margin: 0;
  line-height: 1.2;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(to right, var(--primary-color, #00508c), var(--secondary-color, #fac800));
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    line-height: 1.3;
    margin-bottom: 1rem;
    padding: 0 1rem;
    
    &:after {
      width: 80px;
      height: 3px;
      bottom: -10px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    padding: 0 0.5rem;
    
    &:after {
      width: 60px;
      height: 2px;
      bottom: -8px;
    }
  }
`;

const EventDescription = styled.div`
  background: rgba(0, 80, 140, 0.02);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(0, 80, 140, 0.1);
  position: relative;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    margin: 0;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 1.5rem;
    border-radius: 12px;
    
    p {
      font-size: 1rem;
      line-height: 1.6;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
    
    p {
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem 2rem;
  background: rgba(250, 200, 0, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(250, 200, 0, 0.2);

  .icon {
    color: #00508c;
    flex-shrink: 0;
  }

  .text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #00508c;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
    
    .text {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-top: 0.75rem;
    border-radius: 8px;
    
    .text {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
`;

// Info panel section (right)
const InfoPanel = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 80, 140, 0.1);
  position: sticky;
  top: 120px;
  animation: ${slideInRight} 1s ease-out 0.6s forwards;
  opacity: 0;

  @media (max-width: 1200px) {
    order: 3;
    position: static;
    max-width: 500px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.06);
    margin: 1rem auto 0;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
    margin: 0.75rem auto 0;
  }
`;

const PanelTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #00508c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 80, 140, 0.1);

  &:last-child {
    border-bottom: none;
  }

  .icon {
    color: #00508c;
    flex-shrink: 0;
  }

  .content {
    flex: 1;

    .label {
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
    }

    .value {
      font-size: 1rem;
      color: #333;
      font-weight: 600;
      margin-top: 0.2rem;
    }
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #00508c, #003366);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 80, 140, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 80, 140, 0.4);
    background: linear-gradient(135deg, #003366, #00508c);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
    font-size: 0.95rem;
    border-radius: 10px;
    margin-top: 1.2rem;
    min-height: 50px;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }

  @media (max-width: 480px) {
    padding: 0.9rem 1rem;
    font-size: 0.9rem;
    border-radius: 8px;
    margin-top: 1rem;
    min-height: 48px;
    gap: 0.6rem;
  }
`;

const RegisterButton = styled(DownloadButton)`
  background: linear-gradient(135deg, #fac800, #e6b800);
  color: #00508c;
  box-shadow: 0 4px 15px rgba(250, 200, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, #e6b800, #fac800);
    box-shadow: 0 8px 25px rgba(250, 200, 0, 0.4);
  }

  @media (max-width: 768px) {
    animation: ${pulse} 2s infinite;
    
    &:hover {
      background: linear-gradient(135deg, #fac800, #e6b800);
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
      background: linear-gradient(135deg, #e6b800, #fac800);
    }
  }
`;

// Sponsors section
const SponsorsSection = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 4rem auto 0;
  padding: 0 2rem;
  animation: ${fadeIn} 1s ease-out 0.8s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin: 3rem auto 0;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    margin: 2rem auto 0;
  }
`;

const SponsorTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #00508c;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  width: 100%;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    line-height: 1.2;
    
    &:after {
      width: 80px;
      height: 3px;
      bottom: -8px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
    line-height: 1.3;
    
    &:after {
      width: 60px;
      height: 2px;
      bottom: -6px;
    }
  }
`;

// Markdown content section
const ContentSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;
  animation: ${fadeIn} 1s ease-out 1s forwards;
  opacity: 0;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin: 3rem auto 0;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    margin: 2rem auto 0;
  }
`;

// Content header section
const ContentHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color, #00508c);
    margin-bottom: 1rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(to right, var(--primary-color, #00508c), var(--secondary-color, #fac800));
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #6b7280;
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 2rem;
      margin-bottom: 0.8rem;
      
      &:after {
        width: 80px;
        height: 3px;
        bottom: -8px;
      }
    }
    
    p {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    
    h2 {
      font-size: 1.7rem;
      margin-bottom: 0.6rem;
      
      &:after {
        width: 60px;
        height: 2px;
        bottom: -6px;
      }
    }
    
    p {
      font-size: 0.9rem;
      padding: 0 0.5rem;
    }
  }
`;

// Enhanced markdown content wrapper
const MarkdownWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 80, 140, 0.08);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  /* Add subtle background pattern */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 49%, 
      rgba(0, 80, 140, 0.01) 50%, 
      rgba(0, 80, 140, 0.01) 51%, 
      transparent 52%
    );
    background-size: 20px 20px;
    pointer-events: none;
    z-index: -1;
  }
  
  /* Add subtle border glow on hover */
  &:hover {
    box-shadow: 0 15px 50px rgba(0, 80, 140, 0.1);
    border-color: rgba(0, 80, 140, 0.15);
    transition: all 0.3s ease;
  }

  /* Enhanced typography for markdown content */
  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color, #00508c);
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 2rem;
    line-height: 1.3;
    
    &:first-child {
      margin-top: 0;
    }
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 1rem;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--primary-color, #00508c), var(--secondary-color, #fac800));
      border-radius: 2px;
    }
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1.2rem;
    position: relative;
    padding-bottom: 0.5rem;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, var(--primary-color, #00508c), var(--secondary-color, #fac800));
      border-radius: 2px;
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color, #00508c);
  }

  h4 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }

  h5 {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }

  h6 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a5568;
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    
    li {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4a5568;
      margin-bottom: 0.8rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ul {
    list-style: none;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.8rem;
        width: 8px;
        height: 8px;
        background: var(--primary-color, #00508c);
        border-radius: 50%;
      }
    }
  }

  ol {
    counter-reset: custom-counter;
    
    li {
      counter-increment: custom-counter;
      position: relative;
      padding-left: 2rem;
      
      &:before {
        content: counter(custom-counter);
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background: var(--primary-color, #00508c);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }

  blockquote {
    border-left: 4px solid var(--primary-color, #00508c);
    padding: 1.5rem 2rem;
    margin: 2rem 0;
    background: rgba(0, 80, 140, 0.05);
    border-radius: 0 12px 12px 0;
    font-style: italic;
    position: relative;
    
    p {
      margin-bottom: 0;
      font-size: 1.2rem;
      color: var(--primary-color, #00508c);
      font-weight: 500;
    }
    
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: 15px;
      font-size: 3rem;
      color: var(--primary-color, #00508c);
      font-family: serif;
    }
  }

  code {
    background: rgba(0, 80, 140, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: var(--primary-color, #00508c);
    font-weight: 500;
  }

  pre {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 2rem 0;
    border: 1px solid rgba(0, 80, 140, 0.1);
    
    code {
      background: none;
      padding: 0;
      color: #2d3748;
      font-size: 0.95rem;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(0, 80, 140, 0.1);
    }
    
    th {
      background: var(--primary-color, #00508c);
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    td {
      font-size: 1rem;
      color: #4a5568;
    }
    
    tr:hover {
      background: rgba(0, 80, 140, 0.02);
    }
  }

  /* Table wrapper for horizontal scrolling on mobile */
  .table-wrapper {
    overflow-x: auto;
    margin: 2rem 0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: relative;
    
    table {
      margin: 0;
      min-width: 600px;
    }
    
    /* Scroll indicator for mobile */
    @media (max-width: 768px) {
      &:after {
        content: '← Deslize para ver mais →';
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        color: #6b7280;
        font-style: italic;
        white-space: nowrap;
      }
    }
  }

  a {
    color: var(--primary-color, #00508c);
    text-decoration: none;
    font-weight: 500;
    position: relative;
    
    &:hover {
      color: var(--secondary-color, #fac800);
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--secondary-color, #fac800);
      transition: width 0.3s ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  /* Definition lists styling */
  dl {
    margin: 2rem 0;
    
    dt {
      font-weight: 700;
      color: var(--primary-color, #00508c);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    dd {
      margin-left: 2rem;
      margin-bottom: 1rem;
      color: #4a5568;
      line-height: 1.6;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  /* Focus states for accessibility */
  *:focus {
    outline: 2px solid var(--secondary-color, #fac800);
    outline-offset: 2px;
  }

  hr {
    border: none;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color, #00508c), var(--secondary-color, #fac800));
    margin: 3rem 0;
    border-radius: 2px;
  }

  /* Mobile responsive design */
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
    
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      
      &:after {
        width: 60px;
        height: 3px;
      }
    }
    
    h2 {
      font-size: 1.7rem;
      margin-bottom: 1rem;
      
      &:after {
        width: 45px;
        height: 2px;
      }
    }
    
    h3 {
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }
    
    h4 {
      font-size: 1.2rem;
      margin-bottom: 0.7rem;
    }
    
    h5 {
      font-size: 1.1rem;
      margin-bottom: 0.6rem;
    }
    
    h6 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.2rem;
      text-align: left;
    }
    
    ul, ol {
      margin-bottom: 1.2rem;
      padding-left: 1.5rem;
      
      li {
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 0.6rem;
      }
    }
    
    ul li {
      padding-left: 1.2rem;
      
      &:before {
        width: 6px;
        height: 6px;
        top: 0.7rem;
      }
    }
    
    ol li {
      padding-left: 1.8rem;
      
      &:before {
        width: 20px;
        height: 20px;
        font-size: 0.8rem;
      }
    }
    
    blockquote {
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 0 10px 10px 0;
      
      p {
        font-size: 1.1rem;
      }
      
      &:before {
        font-size: 2.5rem;
        top: -8px;
        left: 10px;
      }
    }
    
    table {
      font-size: 0.9rem;
      
      th, td {
        padding: 0.8rem;
      }
    }
    
    .table-wrapper {
      margin: 1.5rem 0;
      border-radius: 8px;
      
      table {
        min-width: 500px;
      }
    }
    
    pre {
      padding: 1rem;
      margin: 1.5rem 0;
      border-radius: 8px;
      
      code {
        font-size: 0.9rem;
      }
    }
    
    /* Definition lists for mobile */
    dl {
      margin: 1.5rem 0;
      
      dt {
        font-size: 1rem;
        margin-bottom: 0.4rem;
      }
      
      dd {
        margin-left: 1.5rem;
        margin-bottom: 0.8rem;
        font-size: 0.95rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
    
    h1 {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
      
      &:after {
        width: 50px;
        height: 2px;
      }
    }
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
      
      &:after {
        width: 40px;
        height: 2px;
      }
    }
    
    h3 {
      font-size: 1.3rem;
      margin-bottom: 0.7rem;
    }
    
    p {
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 1.2rem;
      
      li {
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }
    }
    
    ul li {
      padding-left: 1rem;
      
      &:before {
        width: 5px;
        height: 5px;
        top: 0.6rem;
      }
    }
    
    ol li {
      padding-left: 1.5rem;
      
      &:before {
        width: 18px;
        height: 18px;
        font-size: 0.75rem;
      }
    }
    
    blockquote {
      padding: 0.8rem 1.2rem;
      margin: 1.2rem 0;
      border-radius: 0 8px 8px 0;
      
      p {
        font-size: 1rem;
      }
      
      &:before {
        font-size: 2rem;
        top: -6px;
        left: 8px;
      }
    }
    
    table {
      font-size: 0.8rem;
      
      th, td {
        padding: 0.6rem;
      }
    }
    
    .table-wrapper {
      margin: 1.2rem 0;
      border-radius: 6px;
      
      table {
        min-width: 400px;
      }
    }
    
    pre {
      padding: 0.8rem;
      margin: 1.2rem 0;
      border-radius: 6px;
      
      code {
        font-size: 0.85rem;
      }
    }
    
    /* Definition lists for small mobile */
    dl {
      margin: 1.2rem 0;
      
      dt {
        font-size: 0.95rem;
        margin-bottom: 0.3rem;
      }
      
      dd {
        margin-left: 1.2rem;
        margin-bottom: 0.6rem;
        font-size: 0.9rem;
      }
    }
  }
`;

// Error handling components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
  
  svg {
    color: #ef4444;
    margin-bottom: 1rem;
  }
`;

const ErrorTitle = styled.h2`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const RetryButton = styled.button`
  background: ${props => props.primaryColor || '#00508c'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primaryColor ? `${props.primaryColor}dd` : '#003c6a'};
    transform: translateY(-2px);
  }
`;

// Coming Soon Page Components
const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 3rem 2rem;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 50vh;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;
    min-height: 45vh;
  }
`;

const ComingSoonIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--primary-color, #00508c), var(--secondary-color, #fac800));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 80, 140, 0.2);
  
  svg {
    color: white;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-bottom: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 80, 140, 0.18);
    
    svg {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
    box-shadow: 0 6px 20px rgba(0, 80, 140, 0.15);
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const ComingSoonTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-color, #00508c);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    line-height: 1.2;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
    line-height: 1.3;
    padding: 0 0.25rem;
  }
`;

const ComingSoonSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
    padding: 0 0.25rem;
  }
`;

const PreviewSection = styled.div`
  background: rgba(0, 80, 140, 0.02);
  border: 1px solid rgba(0, 80, 140, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
    max-width: 350px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;
    max-width: 280px;
  }
`;

const PreviewTitle = styled.h3`
  color: var(--primary-color, #00508c);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PreviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-right: 50px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color, #00508c);
    box-shadow: 0 0 0 3px rgba(0, 80, 140, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    padding-right: 52px;
    font-size: 0.95rem;
    border-radius: 6px;
    min-height: 48px;
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    padding-right: 48px;
    font-size: 0.9rem;
    min-height: 44px;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: var(--primary-color, #00508c);
  }

  @media (max-width: 768px) {
    padding: 8px;
    right: 10px;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    
    &:active {
      background: rgba(0, 80, 140, 0.1);
    }
  }

  @media (max-width: 480px) {
    padding: 6px;
    min-width: 36px;
    min-height: 36px;
  }
`;

const PreviewButton = styled.button`
  background: var(--primary-color, #00508c);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: var(--primary-color, #003c6a);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 0.95rem;
    border-radius: 6px;
    min-height: 48px;
    
    &:hover:not(:disabled) {
      transform: none;
    }
    
    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 0.9rem;
    min-height: 44px;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin: 0;
  text-align: left;
`;

// Preview Mode Indicator
const PreviewModeIndicator = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background: rgba(250, 200, 0, 0.9);
  color: #1f2937;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid #fac800;
  
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    top: 70px;
    right: 50%;
    transform: translateX(50%);
    font-size: 0.8rem;
    padding: 6px 12px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    top: 60px;
    font-size: 0.75rem;
    padding: 5px 10px;
    border-radius: 12px;
  }
`;

const AssembleiaGeral = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [previewPassword, setPreviewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('https://blog2.ifmsabrazil.org/api/config/event');
        const data = response.data;
        
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Não foi possível carregar as informações do evento. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  // Helper functions for date formatting
  const formatEventDate = (startDate, endDate) => {
    if (!startDate) return "";
    
    try {
      const start = new Date(startDate);
      const options = { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'UTC'
      };
      
      if (endDate && startDate !== endDate) {
        const end = new Date(endDate);
        const startFormatted = start.toLocaleDateString('pt-BR', options);
        const endFormatted = end.toLocaleDateString('pt-BR', options);
        
        // Same month and year
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
          return `${start.getDate()} - ${endFormatted}`;
        }
        
        return `${startFormatted} - ${endFormatted}`;
      }
      
      return start.toLocaleDateString('pt-BR', options);
    } catch (error) {
      console.warn("Date formatting failed:", error);
      return startDate;
    }
  };

  const formatLocation = (city, state, venue) => {
    const parts = [venue, city, state].filter(Boolean);
    return parts.join(", ");
  };

  // Password handling functions
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    
    if (!previewPassword.trim()) {
      setPasswordError("Por favor, digite a senha de preview.");
      return;
    }
    
    if (previewPassword === eventData?.previewPassword) {
      setIsPreviewMode(true);
      setPasswordError("");
    } else {
      setPasswordError("Senha incorreta. Tente novamente.");
      setPreviewPassword("");
    }
  };

  const handlePasswordChange = (e) => {
    setPreviewPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine if we should show the coming soon page
  const shouldShowComingSoon = eventData && !eventData.eventActive && !isPreviewMode;

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <PageContainer 
        primaryColor={eventData?.primaryColor} 
        secondaryColor={eventData?.secondaryColor}
      >
        <Helmet>
          <title>Erro - IFMSA Brazil</title>
          <meta name="description" content="Ocorreu um erro ao carregar as informações do evento. Tente novamente." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <ErrorContainer>
          <AlertCircle size={48} />
          <ErrorTitle>Oops! Algo deu errado</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton 
            primaryColor={eventData?.primaryColor} 
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </RetryButton>
        </ErrorContainer>
      </PageContainer>
    );
  }

  // No data state
  if (!eventData) {
    return (
      <PageContainer>
        <Helmet>
          <title>Evento não encontrado - IFMSA Brazil</title>
          <meta name="description" content="Não há informações de evento disponíveis no momento." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <ErrorContainer>
          <AlertCircle size={48} />
          <ErrorTitle>Evento não encontrado</ErrorTitle>
          <ErrorMessage>Não há informações de evento disponíveis no momento.</ErrorMessage>
        </ErrorContainer>
      </PageContainer>
    );
  }

  // Coming Soon state - when event is inactive and no preview password entered
  if (shouldShowComingSoon) {
    return (
      <PageContainer 
        primaryColor={eventData?.primaryColor} 
        secondaryColor={eventData?.secondaryColor}
      >
        {/* SEO Meta Tags for Coming Soon page */}
        <Helmet>
          <title>{eventData.metaTitle || `${eventData.eventTitle} - Em Breve` || "Próximo Evento IFMSA Brazil - Em Breve"}</title>
          <meta name="description" content={eventData.metaDescription || "Em breve teremos novidades sobre nosso próximo evento IFMSA Brazil. Fique ligado!"} />
          {eventData.metaKeywords && <meta name="keywords" content={eventData.metaKeywords} />}
          
          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="event" />
          <meta property="og:title" content={eventData.metaTitle || `${eventData.eventTitle} - Em Breve` || "Próximo Evento IFMSA Brazil - Em Breve"} />
          <meta property="og:description" content={eventData.metaDescription || "Em breve teremos novidades sobre nosso próximo evento IFMSA Brazil. Fique ligado!"} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:site_name" content="IFMSA Brazil" />
          <meta property="og:locale" content="pt_BR" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={eventData.metaTitle || `${eventData.eventTitle} - Em Breve` || "Próximo Evento IFMSA Brazil - Em Breve"} />
          <meta name="twitter:description" content={eventData.metaDescription || "Em breve teremos novidades sobre nosso próximo evento IFMSA Brazil. Fique ligado!"} />
        </Helmet>

        <ComingSoonContainer>
          <ComingSoonIcon>
            <Clock size={48} />
          </ComingSoonIcon>
          
          <ComingSoonTitle>
            {eventData.eventTitle || "Próximo Evento IFMSA Brazil"}
          </ComingSoonTitle>
          
          <ComingSoonSubtitle>
            Em breve teremos novidades sobre nosso próximo evento. 
            Fique ligado em nossas redes sociais para não perder nenhuma informação!
          </ComingSoonSubtitle>

          {eventData.previewPassword && (
            <PreviewSection>
              <PreviewTitle>
                <Lock size={18} />
                Acesso Preview
              </PreviewTitle>
              
              <PreviewForm onSubmit={handlePasswordSubmit}>
                <PasswordInputContainer>
                  <PasswordInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a senha de preview"
                    value={previewPassword}
                    onChange={handlePasswordChange}
                  />
                  <TogglePasswordButton
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </TogglePasswordButton>
                </PasswordInputContainer>
                
                {passwordError && <ErrorText>{passwordError}</ErrorText>}
                
                <PreviewButton type="submit" disabled={!previewPassword.trim()}>
                  Acessar Preview
                </PreviewButton>
              </PreviewForm>
            </PreviewSection>
          )}
        </ComingSoonContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer 
      primaryColor={eventData?.primaryColor} 
      secondaryColor={eventData?.secondaryColor}
    >
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{eventData.metaTitle || eventData.eventTitle || "Evento IFMSA Brazil"}</title>
        <meta name="description" content={eventData.metaDescription || eventData.eventDescription || "Participe do nosso próximo evento e seja parte da mudança na medicina brasileira."} />
        {eventData.metaKeywords && <meta name="keywords" content={eventData.metaKeywords} />}

        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:type" content="event" />
        <meta property="og:title" content={eventData.metaTitle || eventData.eventTitle || "Evento IFMSA Brazil"} />
        <meta property="og:description" content={eventData.metaDescription || eventData.eventDescription || "Participe do nosso próximo evento e seja parte da mudança na medicina brasileira."} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="IFMSA Brazil" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Event-specific Open Graph tags */}
        {eventData.eventLogo && (
          <>
            <meta property="og:image" content={eventData.eventLogo} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={eventData.eventTitle || "Evento IFMSA Brazil"} />
          </>
        )}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={eventData.metaTitle || eventData.eventTitle || "Evento IFMSA Brazil"} />
        <meta name="twitter:description" content={eventData.metaDescription || eventData.eventDescription || "Participe do nosso próximo evento e seja parte da mudança na medicina brasileira."} />
        {eventData.eventLogo && <meta name="twitter:image" content={eventData.eventLogo} />}

        {/* Event-specific meta tags */}
        {eventData.eventDateStart && <meta property="event:start_time" content={eventData.eventDateStart} />}
        {eventData.eventDateEnd && <meta property="event:end_time" content={eventData.eventDateEnd} />}
        {eventData.eventCity && eventData.eventState && (
          <meta property="event:location" content={`${eventData.eventCity}, ${eventData.eventState}`} />
        )}
      </Helmet>

      {/* Preview Mode Indicator */}
      {isPreviewMode && (
        <PreviewModeIndicator>
          <Eye size={16} />
          Modo Preview
        </PreviewModeIndicator>
      )}
      {/* Hero Section with 3-column layout */}
      <HeroSection>
        {/* Left: Event Logo */}
        <LogoSection>
          <EventLogo>
            <img 
              src={eventData.eventLogo || `https://via.placeholder.com/300x300/${eventData.primaryColor?.replace('#', '') || '00508c'}/ffffff?text=${encodeURIComponent(eventData.eventTitle || 'Evento')}`}
              alt={eventData.eventTitle || "Evento"}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x300/${eventData.primaryColor?.replace('#', '') || '00508c'}/ffffff?text=${encodeURIComponent(eventData.eventTitle || 'Evento')}`;
              }}
            />
          </EventLogo>
        </LogoSection>

        {/* Center: Event Info */}
        <MainContent>
          <EventTitle>{eventData.eventTitle || "Evento IFMSA Brazil"}</EventTitle>
          <EventDescription>
            <p>
              {eventData.eventDescription || "Participe do nosso próximo evento e seja parte da mudança na medicina brasileira."}
            </p>
          </EventDescription>
          
        </MainContent>

        {/* Right: Info Panel */}
        {eventData.showDownloads && (
          <InfoPanel>
            <PanelTitle>Informações do Evento</PanelTitle>
            
            {eventData.eventDateStart && (
              <InfoItem>
                <Calendar className="icon" size={20} />
                <div className="content">
                  <div className="label">Data</div>
                  <div className="value">{formatEventDate(eventData.eventDateStart, eventData.eventDateEnd)}</div>
                </div>
              </InfoItem>
            )}

            {(eventData.eventCity || eventData.eventState || eventData.eventVenue) && (
              <InfoItem>
                <MapPin className="icon" size={20} />
                <div className="content">
                  <div className="label">Local</div>
                  <div className="value">
                    {eventData.eventVenue && <>{eventData.eventVenue}<br /></>}
                    {eventData.eventCity}{eventData.eventState ? `, ${eventData.eventState}` : ""}
                  </div>
                </div>
              </InfoItem>
            )}

            {eventData.survivalKitUrl && eventData.survivalKitStatus === "available" && (
              <DownloadButton href={eventData.survivalKitUrl} target="_blank" rel="noopener noreferrer">
                <Download className="icon" size={12} />
                Kit de Sobrevivência
              </DownloadButton>
            )}

            {eventData.survivalKitUrl && eventData.survivalKitStatus === "coming_soon" && (
              <DownloadButton disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                <Download className="icon" size={12} />
                Kit de Sobrevivência (Em Breve)
              </DownloadButton>
            )}

            {eventData.registrationUrl && eventData.registrationStatus === "available" && (
              <RegisterButton href={eventData.registrationUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="icon" size={18} />
                Registre-se Aqui
              </RegisterButton>
            )}

            {eventData.registrationUrl && eventData.registrationStatus === "coming_soon" && (
              <RegisterButton disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                <FileText className="icon" size={18} />
                Registre-se Aqui (Em Breve)
              </RegisterButton>
            )}
          </InfoPanel>
        )}
      </HeroSection>

      {/* Sponsors Section */}
      {eventData.showSponsors && eventData.eventSponsors && eventData.eventSponsors.length > 0 && (
        <SponsorsSection>
          <SponsorTitle>Nossos Patrocinadores e Parceiros</SponsorTitle>
          <SponsorsGallery sponsors={eventData.eventSponsors} />
        </SponsorsSection>
      )}

      {/* Markdown Content Section */}
      {eventData.eventContent && (
        <ContentSection>
          <MarkdownWrapper>
            <MarkdownContent content={eventData.eventContent} />
          </MarkdownWrapper>
        </ContentSection>
      )}
    </PageContainer>
  );
};

export default AssembleiaGeral; 