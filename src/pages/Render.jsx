import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout';
import {styled } from '@mui/material/styles'

const RenderContainer = styled('div')(({theme}) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}))

const Render = () => {
  const viewer = useRef(null);
  const location = useLocation()

  const jsonData = location.state

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/quote.docx',
      },
      viewer.current
    ).then(async (instance) => {
      const { documentViewer } = instance.Core;

      documentViewer.addEventListener('documentLoaded', async () => {
        await documentViewer.getDocument().documentCompletePromise();
        documentViewer.updateView();

        // const doc = documentViewer.getDocument();
        // const keys = doc.getTemplateKeys();
        // console.log(keys);

        await documentViewer.getDocument().applyTemplateValues(jsonData);
      });
    });
  }, [jsonData]);

  return (
    <Layout>
        <RenderContainer>
            <div className='webviewer' ref={viewer}></div>
        </RenderContainer>
    </Layout>
  );
};

export default Render;