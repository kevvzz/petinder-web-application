import React, { useRef } from 'react'
import { Button, Modal, Form, InputGroup, Row, Col } from 'react-bootstrap'
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';

export default function GenerateQRModal(props) {
  const qrCodeRef = useRef();

  const printQRCode = () => {
    const qrCode = qrCodeRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>QR Code</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(qrCode);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const downloadQRCode = () => {
    const name = props.editPetProfile && props.editPetProfile.name
    htmlToImage.toPng(document.getElementById('qrCode'))
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = name +' QrCode.png';
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <>
      <Modal
        show={props.showmodal}
        onHide={props.hidemodal}
        size='md'
        centered
        backdrop="static"
      >
        <Modal.Header className='headerBG' closeButton>
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row ref={qrCodeRef} style={{ height: "auto", margin: "0 auto", maxWidth: "60%", width: "100%"}}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={props.editPetProfile && props.editPetProfile.id}
              id='qrCode'
            />
          </Row>
          <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
              <Form.Label className="mt-3 fw-bold">ID Number</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  value={props.editPetProfile && props.editPetProfile.id}
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
              <Form.Label className="fw-bold">Pet Name</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  type="text"
                  value={props.editPetProfile && props.editPetProfile.name}
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='button-wrapper justify-content-center'>
          <Button onClick={printQRCode}>Print</Button>
          <Button onClick={downloadQRCode}>Download</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
