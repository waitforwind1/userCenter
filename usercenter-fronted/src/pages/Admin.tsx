import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { searchUsers } from '@/services/ant-design-pro/api';

const roleMap: Record<number, { color: string; text: string }> = {
  0: { color: 'default', text: '普通用户' },
  1: { color: 'gold', text: '管理员' },
};

const statusMap: Record<number, { color: string; text: string }> = {
  0: { color: 'success', text: '正常' },
};

const genderMap: Record<number, string> = {
  0: '女',
  1: '男',
};

const columns: ColumnsType<API.UserListItem> = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    width: 90,
    render: (_, record) => (
      <Avatar src={record.avatarUrl}>
        {record.username?.[0]?.toUpperCase()}
      </Avatar>
    ),
  },
  { title: '用户名', dataIndex: 'username', width: 120 },
  { title: '账号', dataIndex: 'account', width: 140 },
  { title: 'PlanetId', dataIndex: 'planetCode', width: 140 },
  { title: '邮箱', dataIndex: 'email', width: 220 },
  { title: '电话', dataIndex: 'phone', width: 140 },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 100,
    render: (value: number) => genderMap[value] || '-',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    width: 110,
    render: (value: number) => {
      const role = roleMap[value] || { color: 'default', text: String(value ?? '-') };
      return <Tag color={role.color}>{role.text}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 110,
    render: (value: number) => {
      const status = statusMap[value] || { color: 'default', text: String(value ?? '-') };
      return <Tag color={status.color}>{status.text}</Tag>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    render: (value: string) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 180,
    render: (value: string) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'),
  },
];

const Admin: React.FC = () => {
  const [data, setData] = useState<API.UserListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const res = await searchUsers();
        setData(res.data || []);
      } catch (error) {
        console.error(error);
        message.error('加载用户列表失败');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <PageContainer
      header={{
        title: '用户管理',
      }}
    >
      <Table<API.UserListItem>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1600 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  );
};

export default Admin;
