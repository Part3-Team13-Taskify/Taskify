import React from 'react';
import Button from '../../common/button';
import Modal from '../../common/modal';
import DashboardColorPicker from '../../common/dashboardcolorpicker';

interface AddDashboardModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const AddDashboardModal: React.FC<AddDashboardModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="mb-32 text-24 font-bold mobile:mb-24 mobile:text-20">새로운 대시보드</div>
      <form className="flex flex-col">
        <label className="mb-10 text-18 font-medium mobile:text-16" htmlFor="dashboardname">
          대시보드 이름
        </label>
        <input
          className="w-full h-48 px-16 mb-28 border-1 border-gray-d9 rounded-6 mobile:h-42 mobile:mb-24"
          id="dashboardname"
          type="text"
          placeholder="대시보드 이름을 입력해주세요"
        />
        <div className="mb-28">
          <DashboardColorPicker />
        </div>
        <Button buttonType="modal2" bgColor="violet" textColor="white" type="submit">
          생성
        </Button>
        <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
          취소
        </Button>
      </form>
    </Modal>
  );
};

export default AddDashboardModal;
