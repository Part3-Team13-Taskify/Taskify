import Image from 'next/image';
import TaskLabel from './TaskLabel';
import Button from '../common/button';
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import Modal from '../common/modal';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TaskData } from './TaskCard';
import { CardData } from './CreateTask';
import { Member } from './CreateTask';
import { useTotalMembersStore } from '@/src/util/zustand';
import { format } from 'date-fns';

import add from '@/public/assets/icon/addViolet.svg';
import close from '@/public/assets/icon/close.svg';
import Chip from '../common/chip';

interface EditTaskModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  cardData: TaskData;
}

const EditTask: React.FC<EditTaskModalProps> = ({ openModal, handleModalClose, cardData }) => {
  if (!openModal) return null;

  const [memberData, setMemberData] = useState<Member[]>([]);
  const [tagValue, setTagValue] = useState<string>();
  const [editData, setEditData] = useState<CardData>({
    dashboardId: cardData.dashboardId,
    columnId: cardData.columnId,
    title: cardData.title,
    description: cardData.description,
    tags: cardData.tags || [],
    imageUrl: cardData.imageUrl,
  });
  const totalMembers = useTotalMembersStore((state) => state.totalMembersData);
  const isRequiredFilled = editData.title && editData.description;
  useEffect(() => {
    setMemberData(totalMembers);
  }, []);

  const handleAssigneeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setEditData((prev) => {
      return { ...prev, assigneeUserId: Number(e.target.value) };
    });
  };
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditData((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setEditData((prev) => {
      return { ...prev, description: e.target.value };
    });
  };
  const handleStatusChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setEditData((prev) => {
      return { ...prev };
    });
  };
  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tags = e.target.value.trim();
    setTagValue(tags);
  };
  const handleTagEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const tagInput = e.target as HTMLInputElement;
    const tag = tagInput.value.trim();

    if ((e.key === 'Enter' || e.key === ' ') && tag !== '' && !editData.tags.includes(tag)) {
      editData.tags.push(tag);
      return setTagValue('');
    }
  };
  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
  };
  // TODO
  // 수정 api 구현
  const handleEditClick = async () => {
    console.log(editData);
  };

  return (
    <Modal className="max-w-540 w-full max-h-910 h-svh" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="text-24 font-bold">할 일 생성</div>
      <form className="flex flex-col gap-32 overflow-y-auto">
        <div className="flex flex-row mobile:flex-col gap-16 mobile:gap-24">
          <TaskLabel htmlFor="status" label="상태">
            <select
              id="status"
              value={status}
              onSelect={handleStatusChange}
              className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15 mobile:max-w-none"
            >
              <option value="to-do">To Do</option>
              <option value="done">Done</option>
              <option value="on-progress">On Progress</option>
            </select>
          </TaskLabel>
          <TaskLabel htmlFor="assignee" label="담당자">
            <select
              id="assignee"
              className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15 mobile:max-w-none"
              value={editData.assigneeUserId}
              onChange={handleAssigneeSelect}
            >
              <option value={undefined} className="text-gray">
                이름을 입력해 주세요
              </option>
              {memberData.map((member) => {
                return <option value={member?.userId}>{member?.nickname}</option>;
              })}
            </select>
          </TaskLabel>
        </div>
        <TaskLabel htmlFor="title" label="제목" isRequired={true}>
          <input
            id="title"
            className="border-1 border-gray-9f rounded-6 focus:border-violet p-15"
            placeholder="제목을 입력해 주세요"
            value={editData.title}
            required
            onChange={handleTitleChange}
          ></input>
        </TaskLabel>
        <TaskLabel htmlFor="description" label="설명" isRequired={true}>
          <textarea
            id="description"
            className="resize-none border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
            placeholder="설명을 입력해 주세요"
            required
            value={editData.description}
            onChange={handleDescriptionChange}
          ></textarea>
        </TaskLabel>
        <TaskLabel htmlFor="due-date" label="마감일">
          <DateTimePicker
            label="날짜를 입력해 주세요"
            className="w-full"
            onChange={(date) => {
              setEditData((prev) => {
                return { ...prev, dueDate: date ? format(date, 'yyyy-MM-dd HH:mm') : undefined };
              });
            }}
          />
        </TaskLabel>
        <TaskLabel htmlFor="tag" label="태그">
          {!!editData.tags.length && (
            <div className="flex flex-row gap-6">
              {editData.tags.map((tag) => {
                return (
                  <Chip>
                    {tag}
                    <button
                      onClick={() => {
                        editData.tags.pop();
                        setEditData((prev) => {
                          return { ...prev };
                        });
                      }}
                    >
                      <Image src={close} width={14} height={14} alt="close"></Image>
                    </button>
                  </Chip>
                );
              })}
            </div>
          )}
          <input
            id="tag"
            type="text"
            placeholder="입력 후 Enter"
            value={tagValue}
            className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
            onChange={handleTagChange}
            onKeyUp={handleTagEnter}
          ></input>
        </TaskLabel>
        <TaskLabel label="이미지">
          <label htmlFor="image" className="p-24 bg-gray-9f w-fit rounded-6">
            <Image src={add} width={28} height={28} alt="add image"></Image>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f text-black-33 focus:outline-none  focus:border-violet"
            hidden
            name="이미지 등록"
            onChange={handleImageChange}
          ></input>
        </TaskLabel>
      </form>
      <div className="flex flex-row-reverse gap-12">
        <Button
          buttonType="modal2"
          bgColor="violet"
          textColor="white"
          disabled={!isRequiredFilled}
          onClick={handleEditClick}
        >
          수정
        </Button>
        <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default EditTask;
