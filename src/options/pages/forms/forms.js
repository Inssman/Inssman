import ColorCover from 'src/options/components/common/colorCover/colorCover';
import Form from 'src/options/components/common/form/form';
import FormBuilder from 'src/options/formBuilder/formBuilder';
import config from 'src/options/formBuilder/config';

function Forms({ onDelete, onSave, mode, error, pageType, ruleMetaData, onChange }) {
  const { generateRule } = config[pageType];
  const onSubmit = () => {
    const form = generateRule(ruleMetaData);
    onSave(form);
  };

  return (
    <ColorCover classes="mx-[5%] p-5">
      <Form onDelete={onDelete} onSubmit={onSubmit} mode={mode} error={error} pageType={pageType}>
        <FormBuilder
          ruleMetaData={ruleMetaData}
          onChange={onChange}
          error={error}
          mode={mode}
          pageType={pageType}
        />
      </Form>
    </ColorCover>
  );
}

export default Forms;