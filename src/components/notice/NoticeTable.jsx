import { Link } from 'react-router-dom';
import axios from 'axios';
import { SlNote } from 'react-icons/sl';
import { useState } from 'react';

export default function NoticeTable(props) {
  const { notice_id, no, page, notice_title, notice_date,
    notice_views, userInfo, handleCheckedItems } = props;
  const [isChecked, setIsChecked] = useState(false);

  const openAddModal = () => setAddModal(true);

  // 조회 수 업데이트 요청
  const handleViewCount = (noticeId) => {
    axios.get(`http://localhost:8000/notice/increase/${noticeId}`)
      .catch(error => console.error(error));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // 체크 여부와 ID를 부모 컴포넌트로 전달
    handleCheckedItems(notice_id, !isChecked);
  };

  return (
    <tr>
      {userInfo.isAdmin ?
        <th>
          <input type='checkbox' id={`notice_check${no}`} checked={isChecked} onChange={handleCheckboxChange} />
          <label htmlFor={`notice_check${no}`} ></label>
        </th>
        : <th>{no}</th>}
      <td>
        <Link to={`/notice/${notice_id}/${page}`}
          onClick={() => handleViewCount(notice_id)}>
          {notice_title}
        </Link>
      </td>
      <td>{notice_date}</td>
      {userInfo.isAdmin ? <td><button type='button'><SlNote className='slnote' /></button></td> : <td>{notice_views}</td>}
    </tr>
  );
};