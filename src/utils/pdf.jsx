import * as pdfjs from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker'
import { pdf } from '@react-pdf/renderer';
import DefaultInvoiceTemplate from "../components/pdf-templates";


export const getPdfAndImage = async (Template = DefaultInvoiceTemplate, data) => {
  const blob = await pdf(<Template data={data} />).toBlob();
  const pdfUrl = URL.createObjectURL(blob);

  const arrayBuffer = await blob.arrayBuffer();
  const pdfObj = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  const page = await pdfObj.getPage(1);
  const scale = 2;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;

  const imageUrl = canvas.toDataURL('image/png');

  return {
		pdfUrl,
		imageUrl,
	};
};
