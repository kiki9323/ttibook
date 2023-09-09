import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import style from './index.module.scss';

export const DownLoadButton = ({ fileName, forwardedRef }) => {
  const handleDownLoad = () => {
    if (!forwardedRef && !forwardedRef.current) return;

    const currentDate = new Date();
    const dateNumber = currentDate.getFullYear() * 10000 + (currentDate.getMonth() + 1) * 100 + currentDate.getDate();
    const timeNumber = currentDate.getHours() * 10000 + currentDate.getMinutes() * 100 + currentDate.getSeconds();

    const cardFrontElement = forwardedRef.current;
    const filter = cardFrontElement => {
      return cardFrontElement.id !== 'shinyEffect';
    };

    domtoimage.toBlob(cardFrontElement, { filter: filter }).then(blob => {
      saveAs(blob, `${fileName}_${dateNumber}_${timeNumber}.png`);
    });
  };

  return (
    <div>
      <button type="button" onClick={handleDownLoad}>
        다운로드
      </button>
    </div>
  );
};
