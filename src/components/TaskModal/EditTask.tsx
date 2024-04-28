import Image from 'next/image';
import instance from '@/src/util/axios';
import { twMerge } from 'tailwind-merge';
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import add from '@/public/assets/icon/addViolet.svg';
import close from '@/public/assets/icon/close.svg';
import { useTotalMembersStore } from '@/src/util/zustand';
import { format } from 'date-fns';
import { DateTimePicker } from '@mui/x-date-pickers';
import TaskLabel from './TaskLabel';
import Button from '../common/button';
import Modal from '../common/modal';
import { CardData, Member } from './CreateTask';

import Chip from '../common/chip';

interface EditTaskModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  cardData: TaskData;
}

export interface TaskData {
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
  columnId: number;
  createdAt: string;
  dashboardId: number;
  description: string;
  dueDate?: string;
  id: number;
  imageUrl?: string;
  tags?: string[];
  teamId: string;
  title: string;
  updatedAt: string;
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
  const currentImage = editData.imageUrl || cardData.imageUrl;
  const imageBg = twMerge('z-10 p-24 w-fit rounded-6', currentImage ? '' : 'bg-gray-d9');

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
  // const handleStatusChange: ChangeEventHandler<HTMLSelectElement> = () => {
  //   setEditData((prev) => {
  //     return { ...prev };
  //   });
  // };
  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tags = e.target.value.trim();
    setTagValue(tags);
  };
  const handleTagEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const tagInput = e.target as HTMLInputElement;
    const tag = tagInput.value.trim();

    if ((e.key === ' ' || e.key === 'Enter') && tag !== '' && !editData.tags.includes(tag)) {
      editData.tags.push(tag);
      return setTagValue('');
    }
    return null;
  };
  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    const formdata = new FormData();
    if (file) {
      formdata.append('image', file);
      const reader = new FileReader();
      reader.onload = async () => {
        const response = await instance.post(`columns/${editData.columnId}/card-image`, formdata);
        if (response.status === 201) {
          setEditData((prev) => {
            return { ...prev, imageUrl: response.data.imageUrl };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = async () => {
    const response = await instance.put(`cards/${cardData.id}`, editData);
    if (response.status === 200) {
      alert('수정 성공!');
      handleModalClose();
    }
  };

  return (
    <Modal className="max-w-540 w-full max-h-910 h-svh" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="text-24 font-bold">할 일 수정</div>
      <form className="flex flex-col gap-32 overflow-y-auto">
        <div className="flex flex-row mobile:flex-col gap-16 mobile:gap-24">
          {/* <TaskLabel htmlFor="status" label="상태">
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
          </TaskLabel> */}
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
        <TaskLabel htmlFor="title" label="제목" isRequired>
          <input
            id="title"
            className="border-1 border-gray-9f rounded-6 focus:border-violet p-15"
            placeholder="제목을 입력해 주세요"
            value={editData.title}
            required
            onChange={handleTitleChange}
          />
        </TaskLabel>
        <TaskLabel htmlFor="description" label="설명" isRequired>
          <textarea
            id="description"
            className="resize-none border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
            placeholder="설명을 입력해 주세요"
            required
            value={editData.description}
            onChange={handleDescriptionChange}
          />
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
            <div className="flex flex-row gap-6 w-full flex-wrap">
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
                      <Image src={close} width={14} height={14} alt="close" />
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
          />
        </TaskLabel>
        <TaskLabel label="이미지" divClass="relative">
          <label htmlFor="image" className={imageBg}>
            <Image src={add} width={28} height={28} alt="add image" />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f text-black-33 focus:outline-none  focus:border-violet"
            hidden
            name="이미지 등록"
            onChange={handleImageChange}
          />
          {!!currentImage && (
            <Image
              src={currentImage}
              width={76}
              height={76}
              alt="이미지"
              className="absolute rounded-6 w-76 h-76 opacity-70 top-1/2 -translate-y-1/4"
            />
          )}
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
