import { css } from "uebersicht"

export const command = 'system_profiler -json SPHardwareDataType'

export const refreshFrequency = false

const container = css `
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: table-row;
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');
  font-size: 30pt;
  font-family: 'EB Garamond', serif;
  font-weight: 300;
  line-height: 1em;
`

const imagey = css `
  display: table-cell;
  margin: 0;
  padding: 0;
`

const texty = css`
  display: table-cell;
  margin: 0;
  padding: 0 .5em;
  background: #E5E1E6;
  border: 2px solid #E5E1E6;
  border-radius: .25em;
  border-color: rgb(255,255,255, .5) rgb(60, 60, 60, .5) rgb(60, 60, 60, .5) rgb(255,255,255, .5);
  vertical-align: middle;
  color: black;
  transform: scale(.9,1);
  filter:
    drop-shadow(1px 1px 1px rgb(240,240,240, .5))
    drop-shadow(-1px -1px 1px rgb(60, 60, 60, .5))
  ;
`

const logo = css`
  height: 55px;
  width: 55px;
  margin: 0;
  filter:
    drop-shadow(1px 1px 1px rgb(240,240,240, .5))
    drop-shadow(-1px -1px 1px rgb(60, 60, 60, .5))
  ;
`

export const render = ({ output }) => {

  var systemName = 'Power Macintosh 21000';
  
  var data = JSON.parse(output);
  if (data) {
    if (data.SPHardwareDataType) {
      var modelCode = data.SPHardwareDataType[0].machine_model;
      var modelName = data.SPHardwareDataType[0].machine_name;
      var processor = '10000';
      if (data.SPHardwareDataType[0].chip_type) {
        processor = data.SPHardwareDataType[0].chip_type;
        processor = processor.replace('Apple ', '');
      }
      else {
        // extract the model code to build a number
        const lettersAndCommas = /(\,|[a-z])*/gi;
        processor = modelCode.replace(lettersAndCommas, '');

        // make sure the final result will be 5 digits to seem like the 90s but newer
        if (processor.length == 2) {
          processor += '0';
        }
        if (data.SPHardwareDataType[0].number_processors) {
          var processorCount = data.SPHardwareDataType[0].number_processors;
          if (processorCount > 10) {
            processor += processorCount;
          }
          else {
            processor += '0' + processorCount;
          }
        }
        else {
          processor += '00';
        }
      }
      var memory    = data.SPHardwareDataType[0].physical_memory;
      memory = memory.replace(' GB', '');

      // assemble as a vintagey name
      systemName = modelName + ' ' + processor + '/' + memory;
    }
  }

  return (
    <div className={container}>
      <div className={imagey}><img className={logo} src="/vintage-apple.widget/AppleLogo1977.png" alt=""/></div>
      <div className={texty}>{systemName}</div>
    </div>
  )
}