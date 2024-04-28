import Image from 'next/image';
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import instance from '@/src/util/axios';
import { format } from 'date-fns';
import { useTotalMembersStore } from '@/src/util/zustand';
import add from '@/public/assets/icon/addViolet.svg';
import close from '@/public/assets/icon/close.svg';
import { twMerge } from 'tailwind-merge';
import Modal from '../common/modal';
import Chip from '../common/chip';
import TaskLabel from './TaskLabel';
import Button from '../common/button';

interface CreateTaskModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dashboardId: number;
  columnId: number;
}
export interface CardData {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags: (string | undefined)[];
  imageUrl?: string | null;
}

export type Member =
  | {
      nickname: string;
      profileImageUrl?: string;
      userId: number;
    }
  | undefined;

const CreateTask: React.FC<CreateTaskModalProps> = ({ openModal, handleModalClose, dashboardId, columnId }) => {
  if (!openModal) return null;

  const [memberData, setMemberData] = useState<Member[]>([]);
  const [tagValue, setTagValue] = useState<string>();
  const [createData, setCreateData] = useState<CardData>({
    dashboardId: dashboardId,
    columnId: columnId,
    title: '',
    description: '',
    tags: [],
    imageUrl: undefined,
  });

  const totalMembers = useTotalMembersStore((state) => state.totalMembersData);

  useEffect(() => {
    setMemberData(totalMembers);
  }, []);

  const isRequiredFilled = createData.description && createData.title;
  const imageBg = twMerge('z-10 p-24 w-fit rounded-6', createData.imageUrl ? '' : 'bg-gray-d9');

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCreateData((prev) => {
      return { ...prev, title: e.target.value.trim() };
    });
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCreateData((prev) => {
      return { ...prev, description: e.target.value.trim() };
    });
  };
  const handleAssigneeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCreateData((prev) => {
      return { ...prev, assigneeUserId: Number(e.target.value) };
    });
  };
  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tags = e.target.value.trim();
    setTagValue(tags);
  };
  const handleTagEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const tagInput = e.target as HTMLInputElement;
    const tag = tagInput.value.trim();

    if ((e.key === 'Enter' || e.key === ' ') && tag !== '' && !createData.tags.includes(tag)) {
      createData.tags.push(tag);
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
        const response = await instance.post(`columns/${createData.columnId}/card-image`, formdata);
        if (response.status === 201) {
          setCreateData((prev) => {
            return { ...prev, imageUrl: response.data.imageUrl };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateClick = async () => {
    const postTaskData = await instance.post(`cards`, createData);
    if (postTaskData.status === 201) {
      alert('생성 성공!');
      handleModalClose();
    }
  };

  return (
    <Modal className="max-w-540 w-full max-h-910 h-svh" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="text-24 font-bold">할 일 생성</div>
      <div className="flex flex-col gap-32 overflow-y-auto">
        {/* TODO
        담당자 프로필 UI 구현 */}
        <TaskLabel htmlFor="assignee" label="담당자">
          <select
            id="assignee"
            className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15"
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
        <TaskLabel htmlFor="title" label="제목" isRequired>
          <input
            id="title"
            className="border-1 border-gray-9f rounded-6 focus:border-violet p-15"
            placeholder="제목을 입력해 주세요"
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
            onChange={handleDescriptionChange}
          />
        </TaskLabel>
        <TaskLabel htmlFor="due-date" label="마감일">
          {/* TODO
          라이브러리 폰트 크기 및 디자인 조정 */}
          <DateTimePicker
            label="날짜를 입력해 주세요"
            className="w-full"
            onChange={(date) => {
              setCreateData((prev) => {
                return { ...prev, dueDate: date ? format(date, 'yyyy-MM-dd HH:mm') : undefined };
              });
            }}
          />
        </TaskLabel>
        <TaskLabel htmlFor="tag" label="태그">
          {!!createData.tags.length && (
            <div className="flex flex-row gap-6 flex-wrap">
              {createData.tags.map((tag) => {
                return (
                  <Chip>
                    {tag}
                    <button
                      onClick={() => {
                        createData.tags.pop();
                        setCreateData((prev) => {
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
          {!!createData.imageUrl && (
            <Image
              src={createData.imageUrl}
              width={76}
              height={76}
              alt="이미지"
              className="absolute rounded-6 w-76 h-76 opacity-70 top-1/2 -translate-y-1/4"
            />
          )}
        </TaskLabel>
      </div>
      <div className="flex flex-row-reverse gap-12">
        <Button
          buttonType="modal2"
          bgColor="violet"
          textColor="white"
          disabled={!isRequiredFilled}
          onClick={handleCreateClick}
        >
          생성
        </Button>
        <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default CreateTask;
