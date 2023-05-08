import React from 'react'
import { Button, Figure, Modal } from 'react-bootstrap'
import bingo from '../../Assets/bingo.jpg'

export default function GenerateQRModal(props) {

    const printImage = async () => {
        const qrCodeImage = document.getElementById('image-to-print');
        if (!qrCodeImage) {
          console.error('Image element not found');
          return;
        }
        if (!qrCodeImage.src) {
          console.error('Image source not set');
          return;
        }
        try {
          const response = await fetch(qrCodeImage.src);
          const blob = await response.blob();
          const dataUrl = URL.createObjectURL(blob);
          const printWindow = window.open(dataUrl, 'Print', 'height=600,width=800');
          printWindow.print();
          URL.revokeObjectURL(dataUrl);
        } catch (error) {
          console.error('Failed to print image:', error);
        }
      };
      
      
      

  return (
    <>
        <Modal
        show={props.showmodal}
        onHide={props.hidemodal}
        size='md'
        centered
        >
            <Modal.Header className='headerBG' closeButton>
                <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Figure>
                    <Figure.Image
                        width={450}
                        height={450}
                        src={bingo}
                        id='image-to-print'
                    />
                </Figure>
            </Modal.Body>
            <Modal.Footer className='button-wrapper'>
            <Button onClick={props.hidemodal}>Close</Button>
          <Button onClick={printImage}>Print</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
