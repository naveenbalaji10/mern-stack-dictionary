import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Link,
  AppBar,
  Toolbar,
  InputBase,
  Grow,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import EmptyCard from '../components/Card'
import Icon from '@material-ui/core/Icon'
import { useState } from 'react'
import SearchAction from '../reducers/actions/SearchAction'
import { useDispatch } from 'react-redux'
import getWords from '../reducers/actions/getWordAction'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'block',
    flex: Grow,
    margin: '5px 0',
    backgroundColor: '#eee',
  },
  abRoot: {
    backgroundColor: '#640016',
  },
  textroot: {
    '& > *': {
      width: '25ch',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  search: {
    position: 'absolute',
    right: 20,
    display: 'flex',
    margin: '0 10px',
    width: '40%',
    color: '#eee',
  },
  inputRoot: {
    width: '100%',
    color: '#eee',
    borderBottom: '1px solid #eee',
  },
  Stitle: {
    color: '#000',
  },
  subtitle: {
    color: '#000',
  },
  addButton: {
    color: '#640016',
  },
}))

//trnasition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

//component

const HomeScreen = () => {
  //dispatch function to dispatch the action
  const dispatch = useDispatch()

  //dialogue box
  const [open, setOpen] = useState(false)
  //input word
  const [word, setWord] = useState('')

  //searchword state

  const searchwords = useSelector((state) => state.search.searchwords)

  // search value
  const [search, setSearch] = useState('')

  //useSelectors to get words
  const words = useSelector((state) => state.search.words)

  // word search
  const handleAdd = (e) => {
    e.preventDefault()
    //disptaching the action
    dispatch(SearchAction(word))
    //cardscreen
    setOpen(false)
  }

  let dataSearch = words.data
    ? words.data.filter((word) => {
        return Object.keys(word).some((key) =>
          word[key]
            .toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase())
        )
      })
    : ''
  // fetching the data from mongodb
  useEffect(() => {
    dispatch(getWords())
  }, [dispatch, searchwords])

  const classes = useStyles()

  //input field handler
  const textHandler = (e) => {
    setWord(e.target.value)
  }

  // dialog box
  const dialogHandler = (e) => {
    e.preventDefault()
    setOpen(true)
    setWord('')
  }

  //search value handler
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  //search icon
  const handleClick = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (
    <div style={{ backgroundColor: '#eee', width: '100%' }}>
      {/* header */}
      <AppBar className={classes.abRoot}>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Dictionary
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{ 'aria-label': 'search' }}
              type='text'
              value={search}
              onChange={handleChange}
            />
            <div className={classes.searchIcon} onClick={handleClick}>
              <SearchIcon />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {/* card container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '50px 0',
          padding: '0 10px',
          backgroundColor: '#eee',
          width: '100%',
        }}
      >
        <h3>Words List</h3>
        {words.length === 0 ? (
          <EmptyCard />
        ) : (
          dataSearch.map((item) => (
            <Card className={classes.root} key={uuidv4()}>
              <Link
                href={`/word/${item._id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardContent>
                  <Typography className={classes.Stitle} gutterBottom>
                    <strong> {item.word}</strong>
                  </Typography>
                  <Typography
                    variant='body2'
                    component='div'
                    className={classes.subtitle}
                  >
                    <p style={{ margin: '0' }}>
                      Origin: {item.origin ? item.origin : 'no origin found'}
                    </p>
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          ))
        )}
        {/* add words button */}
        <div>
          <Button
            style={{ position: 'fixed', right: '20px', bottom: '20px' }}
            onClick={dialogHandler}
          >
            <Icon className={classes.addButton} style={{ fontSize: '50px' }}>
              add_circle
            </Icon>
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleAdd}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle id='alert-dialog-slide-title'>
              {'Add a word'}
            </DialogTitle>
            <DialogContent>
              <TextField
                id='standard-basic'
                label='Type a word'
                value={word}
                onChange={textHandler}
                className={classes.textroot}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAdd} color='primary'>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
