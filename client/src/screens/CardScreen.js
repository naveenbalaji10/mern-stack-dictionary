import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Button } from '@material-ui/core'

const CardScreen = ({ match, history }) => {
  const words = useSelector((state) => state.search.words)

  const word = words.data.find((item) => item._id === match.params.id)

  const exitHandler = () => {
    history.push('/')
  }

  return (
    <div style={{ backgroundColor: '#eee' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          fontSize: '35px',
          width: '100%',
          backgroundColor: '#eee',
          zIndex: 100,
        }}
      >
        <Button
          onClick={exitHandler}
          style={{ position: 'fixed', top: '10px', right: '20px' }}
        >
          Back <ExitToAppIcon />
        </Button>
        <h1 style={{ position: 'sticky' }}>{word.word}</h1>
      </div>

      <div
        style={{
          position: 'absolute',
          overflowY: 'hidden',
          top: '180px',
          paddingTop: '60px',
          padding: '10px',
          backgroundColor: '#eee',
          width: '100%',
        }}
      >
        <div style={{ padding: '10px 0' }}>
          {/* //origin */}
          <strong>origin</strong>
          <p style={{ padding: '5px 0' }}>
            {word.origin !== '' ? word.origin : 'no origin found'}
          </p>
        </div>

        {/* //phonetics */}

        <div>
          <strong>Phonetics:</strong>
          {word.phonetics.text !== ''
            ? word.phonetics.map((phon) => <p key={uuidv4()}>{phon.text}</p>)
            : 'phonetics not found'}

          <strong>Audio:</strong>
          {word.phonetics.audio !== '' ? (
            word.phonetics.map(
              (phon) =>
                phon.audio && (
                  <div style={{ padding: '10px' }}>
                    <audio key={uuidv4()} controls>
                      <source src={phon.audio} type='audio/mp3' />
                      your browser does not support audio
                    </audio>
                  </div>
                )
            )
          ) : (
            <p>Audio not found</p>
          )}
        </div>

        <div>
          {/* parts of speech */}
          {word.meanings.map((meaning) => (
            <p key={uuidv4()}>
              <strong>Parts of Speech: </strong> {meaning.partOfSpeech}
            </p>
          ))}
          {word.meanings.map((meaning) => (
            <div key={uuidv4()}>
              {meaning.definitions.map((item) => (
                <p key={uuidv4()}>
                  <strong>Definitions:</strong>{' '}
                  {item.definition ? item.definition : 'definitions not found'}
                  <br />
                  <strong>Example: </strong>{' '}
                  {item.example ? item.example : 'examples not found'}
                </p>
              ))}
            </div>
          ))}
          {word.meanings.map((meaning) => (
            <div style={{ margin: '10px 0' }} key={uuidv4()}>
              <strong>Synonyms: </strong>
              {meaning.definitions.map((item) =>
                item.synonyms.length > 0 ? (
                  item.synonyms.map((synonym) => (
                    <div
                      style={{ display: 'inline-flex', margin: '0' }}
                      key={uuidv4()}
                    >
                      {synonym}
                      {item.synonyms.length > 1 ? ',' : ''}
                    </div>
                  ))
                ) : (
                  <p>synonyms not found</p>
                )
              )}
            </div>
          ))}

          {word.meanings.map((meaning) => (
            <div style={{ margin: '10px 0' }} key={uuidv4()}>
              <strong>Antonyms: </strong>
              {meaning.definitions.map((item) =>
                item.antonyms.length > 0 ? (
                  item.antonyms.map((antonym) => (
                    <div
                      style={{ display: 'inline-flex', margin: '0' }}
                      key={uuidv4()}
                    >
                      {antonym}
                      {item.antonyms.length > 1 ? ',' : ''}
                    </div>
                  ))
                ) : (
                  <p>antonyms not found</p>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardScreen
