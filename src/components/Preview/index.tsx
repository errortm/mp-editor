import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import styled from '@emotion/styled'
import { useStyle } from '../../contexts/StyleContext'

const PreviewContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`

const getFancyStyles = (themeId: string) => {
  switch (themeId) {
    case 'minimal-blackwhite':
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #111; border-left: 4px solid #111; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-blue {
          font-size: 20px; font-weight: bold; color: #0056b3; border-left: 4px solid #0056b3; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-green {
          font-size: 20px; font-weight: bold; color: #008000; border-left: 4px solid #008000; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-orange {
          font-size: 20px; font-weight: bold; color: #d35400; border-left: 4px solid #d35400; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-purple {
          font-size: 20px; font-weight: bold; color: #800080; border-left: 4px solid #800080; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: #eee; padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #111; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #111; background: #fafafa; padding: 12px 16px; color: #222; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-gray {
          border-left: 4px solid #808080; background: #f0f0f0; padding: 12px 16px; color: #333; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-blue {
          border-left: 4px solid #0056b3; background: #e6f7ff; padding: 12px 16px; color: #0056b3; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-green {
          border-left: 4px solid #008000; background: #e6ffe6; padding: 12px 16px; color: #008000; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-orange {
          border-left: 4px solid #d35400; background: #fff0e6; padding: 12px 16px; color: #d35400; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-purple {
          border-left: 4px solid #800080; background: #f0e6ff; padding: 12px 16px; color: #800080; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #111; margin: 24px 0;
        }
        .fancy-hr-gray {
          border: none; border-top: 2px solid #808080; margin: 24px 0;
        }
        .fancy-hr-blue {
          border: none; border-top: 2px solid #0056b3; margin: 24px 0;
        }
        .fancy-hr-green {
          border: none; border-top: 2px solid #008000; margin: 24px 0;
        }
        .fancy-hr-orange {
          border: none; border-top: 2px solid #d35400; margin: 24px 0;
        }
        .fancy-hr-purple {
          border: none; border-top: 2px solid #800080; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #111; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #111; line-height: 1.75;
        }
        .fancy-list-gray {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-gray li {
          margin: 8px 0; font-size: 16px; color: #808080; line-height: 1.75;
        }
        .fancy-list-blue {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-blue li {
          margin: 8px 0; font-size: 16px; color: #0056b3; line-height: 1.75;
        }
        .fancy-list-green {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-green li {
          margin: 8px 0; font-size: 16px; color: #008000; line-height: 1.75;
        }
        .fancy-list-orange {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-orange li {
          margin: 8px 0; font-size: 16px; color: #d35400; line-height: 1.75;
        }
        .fancy-list-purple {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-purple li {
          margin: 8px 0; font-size: 16px; color: #800080; line-height: 1.75;
        }
        .fancy-subtitle {
          font-size: 18px; font-weight: 500; color: #888; border-left: 3px solid #888; padding-left: 8px; margin: 14px 0; line-height: 1.7;
        }
        .fancy-step {
          display: inline-block; font-size: 16px; font-weight: bold; color: #fff; background: #111; border-radius: 50px; padding: 2px 14px; margin: 8px 0 8px 0; letter-spacing: 2px;
        }
        .fancy-info {
          background: #f5f5f5; color: #111; border-left: 4px solid #bbb; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 15px;
        }
        .fancy-btn {
          display: inline-block; background: #111; color: #fff; border-radius: 20px; padding: 4px 18px; font-size: 15px; font-weight: 500; margin: 8px 0; cursor: pointer; text-decoration: none;
        }
        .fancy-card {
          background: #fafbfc; border: 1px solid #111; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 18px 20px; margin: 18px 0; font-size: 16px;
        }
      `
    case 'business-blue':
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #0056b3; border-left: 4px solid #0056b3; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-blue {
          font-size: 20px; font-weight: bold; color: #0056b3; border-left: 4px solid #0056b3; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-green {
          font-size: 20px; font-weight: bold; color: #008000; border-left: 4px solid #008000; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-orange {
          font-size: 20px; font-weight: bold; color: #d35400; border-left: 4px solid #d35400; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-purple {
          font-size: 20px; font-weight: bold; color: #800080; border-left: 4px solid #800080; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: linear-gradient(90deg,#e3f0ff,#b3d8ff); padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #0056b3; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #0056b3; background: #e6f7ff; padding: 12px 16px; color: #0056b3; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-gray {
          border-left: 4px solid #808080; background: #f0f0f0; padding: 12px 16px; color: #333; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-blue {
          border-left: 4px solid #0056b3; background: #e6f7ff; padding: 12px 16px; color: #0056b3; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-green {
          border-left: 4px solid #008000; background: #e6ffe6; padding: 12px 16px; color: #008000; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-orange {
          border-left: 4px solid #d35400; background: #fff0e6; padding: 12px 16px; color: #d35400; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-purple {
          border-left: 4px solid #800080; background: #f0e6ff; padding: 12px 16px; color: #800080; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #0056b3; margin: 24px 0;
        }
        .fancy-hr-gray {
          border: none; border-top: 2px solid #808080; margin: 24px 0;
        }
        .fancy-hr-blue {
          border: none; border-top: 2px solid #0056b3; margin: 24px 0;
        }
        .fancy-hr-green {
          border: none; border-top: 2px solid #008000; margin: 24px 0;
        }
        .fancy-hr-orange {
          border: none; border-top: 2px solid #d35400; margin: 24px 0;
        }
        .fancy-hr-purple {
          border: none; border-top: 2px solid #800080; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #0056b3; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #0056b3; line-height: 1.75;
        }
        .fancy-list-gray {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-gray li {
          margin: 8px 0; font-size: 16px; color: #808080; line-height: 1.75;
        }
        .fancy-list-blue {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-blue li {
          margin: 8px 0; font-size: 16px; color: #0056b3; line-height: 1.75;
        }
        .fancy-list-green {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-green li {
          margin: 8px 0; font-size: 16px; color: #008000; line-height: 1.75;
        }
        .fancy-list-orange {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-orange li {
          margin: 8px 0; font-size: 16px; color: #d35400; line-height: 1.75;
        }
        .fancy-list-purple {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-purple li {
          margin: 8px 0; font-size: 16px; color: #800080; line-height: 1.75;
        }
        .fancy-subtitle {
          font-size: 18px; font-weight: 500; color: #0056b3; border-left: 3px solid #0056b3; padding-left: 8px; margin: 14px 0; line-height: 1.7;
        }
        .fancy-step {
          display: inline-block; font-size: 16px; font-weight: bold; color: #fff; background: #0056b3; border-radius: 50px; padding: 2px 14px; margin: 8px 0 8px 0; letter-spacing: 2px;
        }
        .fancy-info {
          background: #e6f7ff; color: #0056b3; border-left: 4px solid #91d5ff; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 15px;
        }
        .fancy-btn {
          display: inline-block; background: #0056b3; color: #fff; border-radius: 20px; padding: 4px 18px; font-size: 15px; font-weight: 500; margin: 8px 0; cursor: pointer; text-decoration: none;
        }
        .fancy-card {
          background: #f0f6ff; border: 1px solid #0056b3; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,86,179,0.08); padding: 18px 20px; margin: 18px 0; font-size: 16px;
        }
      `
    case 'warm':
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #d35400; border-left: 4px solid #d35400; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-blue {
          font-size: 20px; font-weight: bold; color: #0056b3; border-left: 4px solid #0056b3; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-green {
          font-size: 20px; font-weight: bold; color: #008000; border-left: 4px solid #008000; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-orange {
          font-size: 20px; font-weight: bold; color: #d35400; border-left: 4px solid #d35400; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-purple {
          font-size: 20px; font-weight: bold; color: #800080; border-left: 4px solid #800080; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: linear-gradient(90deg,#fbeee6,#f6c390); padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #d35400; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #d35400; background: #fbeee6; padding: 12px 16px; color: #b9770e; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-gray {
          border-left: 4px solid #808080; background: #f0f0f0; padding: 12px 16px; color: #333; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-blue {
          border-left: 4px solid #0056b3; background: #e6f7ff; padding: 12px 16px; color: #0056b3; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-green {
          border-left: 4px solid #008000; background: #e6ffe6; padding: 12px 16px; color: #008000; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-orange {
          border-left: 4px solid #d35400; background: #fff0e6; padding: 12px 16px; color: #d35400; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-purple {
          border-left: 4px solid #800080; background: #f0e6ff; padding: 12px 16px; color: #800080; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #d35400; margin: 24px 0;
        }
        .fancy-hr-gray {
          border: none; border-top: 2px solid #808080; margin: 24px 0;
        }
        .fancy-hr-blue {
          border: none; border-top: 2px solid #0056b3; margin: 24px 0;
        }
        .fancy-hr-green {
          border: none; border-top: 2px solid #008000; margin: 24px 0;
        }
        .fancy-hr-orange {
          border: none; border-top: 2px solid #d35400; margin: 24px 0;
        }
        .fancy-hr-purple {
          border: none; border-top: 2px solid #800080; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #d35400; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #d35400; line-height: 1.75;
        }
        .fancy-list-gray {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-gray li {
          margin: 8px 0; font-size: 16px; color: #808080; line-height: 1.75;
        }
        .fancy-list-blue {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-blue li {
          margin: 8px 0; font-size: 16px; color: #0056b3; line-height: 1.75;
        }
        .fancy-list-green {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-green li {
          margin: 8px 0; font-size: 16px; color: #008000; line-height: 1.75;
        }
        .fancy-list-orange {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-orange li {
          margin: 8px 0; font-size: 16px; color: #d35400; line-height: 1.75;
        }
        .fancy-list-purple {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-purple li {
          margin: 8px 0; font-size: 16px; color: #800080; line-height: 1.75;
        }
        .fancy-subtitle {
          font-size: 18px; font-weight: 500; color: #d35400; border-left: 3px solid #d35400; padding-left: 8px; margin: 14px 0; line-height: 1.7;
        }
        .fancy-step {
          display: inline-block; font-size: 16px; font-weight: bold; color: #fff; background: #d35400; border-radius: 50px; padding: 2px 14px; margin: 8px 0 8px 0; letter-spacing: 2px;
        }
        .fancy-info {
          background: #fff7e6; color: #d35400; border-left: 4px solid #ffd591; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 15px;
        }
        .fancy-btn {
          display: inline-block; background: #d35400; color: #fff; border-radius: 20px; padding: 4px 18px; font-size: 15px; font-weight: 500; margin: 8px 0; cursor: pointer; text-decoration: none;
        }
        .fancy-card {
          background: #fffaf3; border: 1px solid #d35400; border-radius: 10px; box-shadow: 0 2px 8px rgba(211,84,0,0.08); padding: 18px 20px; margin: 18px 0; font-size: 16px;
        }
      `
    default:
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #ff4d4f; border-left: 4px solid #ff4d4f; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-blue {
          font-size: 20px; font-weight: bold; color: #0056b3; border-left: 4px solid #0056b3; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-green {
          font-size: 20px; font-weight: bold; color: #008000; border-left: 4px solid #008000; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-orange {
          font-size: 20px; font-weight: bold; color: #d35400; border-left: 4px solid #d35400; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-purple {
          font-size: 20px; font-weight: bold; color: #800080; border-left: 4px solid #800080; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: linear-gradient(90deg,#fcb69f,#ffecd2); padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #ff4d4f; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #ff4d4f; background: #fff0f0; padding: 12px 16px; color: #b22222; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-gray {
          border-left: 4px solid #808080; background: #f0f0f0; padding: 12px 16px; color: #333; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-blue {
          border-left: 4px solid #0056b3; background: #e6f7ff; padding: 12px 16px; color: #0056b3; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-green {
          border-left: 4px solid #008000; background: #e6ffe6; padding: 12px 16px; color: #008000; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-orange {
          border-left: 4px solid #d35400; background: #fff0e6; padding: 12px 16px; color: #d35400; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-quote-purple {
          border-left: 4px solid #800080; background: #f0e6ff; padding: 12px 16px; color: #800080; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #ff4d4f; margin: 24px 0;
        }
        .fancy-hr-gray {
          border: none; border-top: 2px solid #808080; margin: 24px 0;
        }
        .fancy-hr-blue {
          border: none; border-top: 2px solid #0056b3; margin: 24px 0;
        }
        .fancy-hr-green {
          border: none; border-top: 2px solid #008000; margin: 24px 0;
        }
        .fancy-hr-orange {
          border: none; border-top: 2px solid #d35400; margin: 24px 0;
        }
        .fancy-hr-purple {
          border: none; border-top: 2px solid #800080; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #b22222; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #ff4d4f; line-height: 1.75;
        }
        .fancy-list-gray {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-gray li {
          margin: 8px 0; font-size: 16px; color: #808080; line-height: 1.75;
        }
        .fancy-list-blue {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-blue li {
          margin: 8px 0; font-size: 16px; color: #0056b3; line-height: 1.75;
        }
        .fancy-list-green {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-green li {
          margin: 8px 0; font-size: 16px; color: #008000; line-height: 1.75;
        }
        .fancy-list-orange {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-orange li {
          margin: 8px 0; font-size: 16px; color: #d35400; line-height: 1.75;
        }
        .fancy-list-purple {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list-purple li {
          margin: 8px 0; font-size: 16px; color: #800080; line-height: 1.75;
        }
        .fancy-subtitle {
          font-size: 18px; font-weight: 500; color: #111; border-left: 3px solid #111; padding-left: 8px; margin: 14px 0; line-height: 1.7;
        }
        .fancy-step {
          display: inline-block; font-size: 16px; font-weight: bold; color: #fff; background: #111; border-radius: 50px; padding: 2px 14px; margin: 8px 0 8px 0; letter-spacing: 2px;
        }
        .fancy-info {
          background: #f5f5f5; color: #111; border-left: 4px solid #bbb; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 15px;
        }
        .fancy-btn {
          display: inline-block; background: #111; color: #fff; border-radius: 20px; padding: 4px 18px; font-size: 15px; font-weight: 500; margin: 8px 0; cursor: pointer; text-decoration: none;
        }
        .fancy-card {
          background: #fafbfc; border: 1px solid #111; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 18px 20px; margin: 18px 0; font-size: 16px;
        }
      `
  }
}

const StyledMarkdown = styled(MDEditor.Markdown, {
  shouldForwardProp: (prop) => prop !== 'template',
})<{ template: any }>`
  h1 {
    ${(props) => props.template.styles.title}
  }
  h2, h3, h4, h5, h6 {
    ${(props) => props.template.styles.subtitle}
  }
  p {
    ${(props) => props.template.styles.paragraph}
  }
  blockquote {
    ${(props) => props.template.styles.quote}
  }
  ul, ol {
    ${(props) => props.template.styles.list}
  }
  img {
    ${(props) => props.template.styles.image}
  }
  ${(props) => getFancyStyles(props.template.id)}
`

interface PreviewProps {
  value: string
}

const Preview: React.FC<PreviewProps> = ({ value }) => {
  const { currentTemplate } = useStyle()

  return (
    <PreviewContainer>
      <StyledMarkdown source={value} template={currentTemplate} />
    </PreviewContainer>
  )
}

export default Preview 