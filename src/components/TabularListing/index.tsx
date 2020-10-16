import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { Visibility, Edit, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    minHeight: 610,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: 300,
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(2.5),
  },
  scrollableTable: {
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
  table: {
    width: '100%',
    marginBottom: theme.spacing(10),
  },
  tableHead: {
    backgroundColor: '#F5F6FA',
  },
  noBorder: {
    border: 'none',
    color: '#A3A7B4',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
}));

interface IProps {
  rows: any[][];
  headers: string[];
  title: string;
  actions?: ('view' | 'edit' | 'delete')[];
  addResourceLabel?: string;
  addResourceCallback?: () => void;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  removeResourceLabel?: string;
  removeResourceCallback?: () => void;
  showMoreCallback?: () => void;
}

const TabularListing = ({
  title,
  rows,
  headers,
  actions,
  addResourceLabel = 'Add',
  addResourceCallback,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  removeResourceLabel = 'Delete',
  removeResourceCallback,
  showMoreCallback,
}: IProps) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Typography
        variant="h5"
        align="left"
        color="textPrimary"
        className={classes.title}
      >
        {title}
      </Typography>
      <div className={classes.scrollableTable}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {headers.map((header) =>
                header === 'id' ? null : (
                  <TableCell
                    key={header}
                    className={classes.noBorder}
                    align="left"
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </TableCell>
                ),
              )}
              {actions && actions.length ? (
                <TableCell
                  key="action"
                  className={classes.noBorder}
                  align="right"
                >
                  ACTION
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {row.map((column, columnIndex) =>
                  column[0] === 'id' ? null : (
                    <TableCell key={columnIndex} align="left">
                      {column[1]}
                    </TableCell>
                  ),
                )}
                {actions && actions.length ? (
                  <TableCell key="action" align="right">
                    <div className={classes.actions}>
                      {actions.includes('view') && (
                        <IconButton
                          onClick={() => onView(row[0][1])}
                          aria-label="view resource"
                          component="span"
                        >
                          <Visibility />
                        </IconButton>
                      )}
                      {actions.includes('edit') && (
                        <IconButton
                          onClick={() => onEdit(row[0][1])}
                          aria-label="edit resource"
                          component="span"
                        >
                          <Edit />
                        </IconButton>
                      )}
                      {actions.includes('delete') && (
                        <IconButton
                          onClick={() => onDelete(row[0][1])}
                          aria-label="delete resource"
                          component="span"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </div>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={classes.footerActions}>
        {showMoreCallback && <Button color="primary">Show More</Button>}
        {addResourceCallback && (
          <Button
            color="primary"
            onClick={addResourceCallback}
            variant="contained"
            size="large"
          >
            {addResourceLabel}
          </Button>
        )}
        {removeResourceCallback && (
          <Button
            color="secondary"
            onClick={removeResourceCallback}
            variant="contained"
            size="large"
          >
            {removeResourceLabel}
          </Button>
        )}
      </div>
    </TableContainer>
  );
};

export default TabularListing;
