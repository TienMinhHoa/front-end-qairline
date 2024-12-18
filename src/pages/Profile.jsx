import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material';

// Dữ liệu người dùng giả lập
const user = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '+84 123 456 789',
  address: '123 Đường Láng, Hà Nội, Việt Nam',
  avatar: 'https://via.placeholder.com/150', // Avatar placeholder (có thể thay link ảnh thật)
};

const ProfilePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '16px',
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: '#1976d2',
          }}
        >
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            {user.email}
          </Typography>
          <Box sx={{ marginTop: '16px' }}>
            <Typography variant="body1">
              <strong>Số điện thoại:</strong> {user.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Địa chỉ:</strong> {user.address}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', marginTop: '24px' }}>
            <Button variant="contained" color="primary" sx={{ marginRight: '8px' }}>
              Chỉnh sửa
            </Button>
            <Button variant="outlined" color="error">
              Đăng xuất
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
