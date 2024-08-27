import { useState, useRef } from 'react'
import sonnetsData from './data/sonnetsData'
import Header from './components/Header'
import './styles.css'
export default function App() {
  const inputRef = useRef()
  const [searchInput, setSearchInput] = useState('')

  function handleClick() {
    setSearchInput(inputRef.current.value.trim())
  }

  /* Challenge

  Kullanıcı " Arama " butonuna tıkladığında, input alanına yazdığı metin searchInput state'inin değeri olur (bu kod zaten yazılmıştı).    
 1. SonnetsData array'indeki satırlarından birinde searchInput değerini içeren her bir sonnet için "sonnets-container" div'inde 
 className'i "sonnet" olan bir div oluşturun (satır 27). 
    
    2. "sonnet" div'inde, sonenin number özelliğini bir <h3> öğesinin metin içeriği olarak ekleyin ve ardından lines özelliğinden/dizisinden 
    sonenin *her* satırını bir <p> öğesinin text içeriği olarak ekleyin, böylece sonenin her satırı için bir <p> elde edin. 
       
    3. "Love", "summer", "winter" ve "strange" gibi yaygın sözcüklerin yanı sıra "hello" ve "weird" gibi hiçbir sonede geçmeyen sözcükleri arayarak kodunuzu test edin.
*/


  return (
    <div className='wrapper'>
      <Header searchProps={{ inputRef, handleClick }} />

      <div className='sonnets-container'>
        {searchInput && sonnetsData.some((sonnet) =>
        sonnet.lines.some((line) => line.includes(searchInput))
        ) 
        ?sonnetsData.map((sonnet) => {
          if (sonnet.lines.some((line) => line.includes(searchInput.toLowerCase())
          )
        ) {
          return (
            <div className='sonnet' key={sonnet.number}>
              <h3>{sonnet.number}</h3>
              {sonnet.lines.map((line,lineindex) => {
                const input = line.split(new RegExp (`(${searchInput})` , 'gi'))
                .map((word,wordindex) => word.toLowerCase() === searchInput.toLowerCase() ? (
                  <span key={`${lineindex}${wordindex}`}>{word}</span>
                ) : (
                  word
                )
              )
              return <p key={lineindex}>{input}</p>
              })}
            </div>
          )
        
        }
        return null
        })
      : searchInput && (
        <p className='no-results-message'>
          Ne yazık ki, araman sonucu hiçbir şey bulamadın
        </p>
      )}
        </div>
       
    </div>
  );

}

/*Bonus Challenges
      
    - Arama sonucu yoksa, "sonnets-container" div'inde "Ne yazık ki, araman sonucunda hiçbir şey bulamadın." yazan bir <p> öğesi oluşturun.
     <p> öğesine "no-results-message" şeklinde bir className verin. 
      
    - Sonuçlar varsa, sonedeki searchInput değeriyle eşleşen her kelimenin etrafına bir <span> koyun. 
    Böylece kelime otomatik olarak vurgulanacaktır (CSS zaten ayarlanmıştır). 
*/
