import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { postColumns } from '@/src/api/columnsApi';

import Button from '../../common/button';
import Modal from '../../common/modal';

interface AddColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ openModal, handleModalClose }) => {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  const [columnName, setColumnName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColumnName(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이미 요청 중인 경우 무시
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await postColumns({
        title: columnName,
        dashboardId: dashboardId,
      });

      setColumnName('');
      handleModalClose();
    } catch (error) {
      console.error('Failed to post columns data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setColumnName('');
    handleModalClose();
  };

  const isInputEmpty = columnName.trim() === '';

  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleCloseModal}>
      <div className="mb-32 text-24 font-bold">새 컬럼 생성</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-10 text-18 font-medium" htmlFor="columnName">
          이름
        </label>
        <input
          className="w-full h-48 px-16 mb-28 border-1 border-gray-d9 rounded-6"
          type="text"
          placeholder="새로운 프로젝트"
          value={columnName}
          onChange={handleInputChange}
        />
        <div className="flex flex-row-reverse gap-12 mobile:gap-11">
          <Button type="submit" buttonType="modal2" bgColor="violet" textColor="white" disabled={isInputEmpty}>
            생성
          </Button>
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleCloseModal}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
