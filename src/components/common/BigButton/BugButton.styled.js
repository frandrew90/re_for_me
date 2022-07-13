export const btnStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  backgroundColor: '#FF6B0A',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 200ms',
  '&:not(:disabled):hover': {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  },
  '&:disabled': {
    backgroundColor: '#FFE0B2',
    cursor: 'not-allowed',
  },
  '& .image': {
    marginRight: 10,
    with: 12,
    height: 12,
  },
  '& .heading': {
    // color: '#fff',
    lineHeight: 1.2,
  },
};
