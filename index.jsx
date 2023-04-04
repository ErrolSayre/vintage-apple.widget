import { css } from "uebersicht"

export const command = 'system_profiler -json SPHardwareDataType'

export const refreshFrequency = false

const container = css `
  position: fixed;
  bottom: 10px;
  left: 20px;
  display: table-row;
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');
  font-size: 30pt;
  font-family: 'EB Garamond', serif;
  font-weight: 300;
`

const imagey = css `
  display: table-cell;
  margin: 0;
  padding: 0;
`

const texty = css`
  display: table-cell;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  color: black;
  transform: scale(.9,1);
`

const logo = css`
  height: 65px;
  width: 65px;
  margin: 0;
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

        // add some more digits
        if (data.SPHardwareDataType[0].number_processors) {
          var processorCount = data.SPHardwareDataType[0].number_processors;
          if (processorCount > 10) {
            processor += '0' + processorCount;
          }
          else {
            processor += '00' + processorCount;
          }
        }
        else {
          processor += '000';
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