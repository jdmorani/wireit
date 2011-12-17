#!/bin/sh
# Build WireIt rollup files
# Compressed using the YUI compressor

YUIcompressorJar=../scripts/yuicompressor-2.4.2.jar

cd ../build

# Core wireit rollup
rm -f wireit.js wireit-min.js
cat ../js/WireIt.js ../js/CanvasElement.js ../js/Wire.js ../js/StepWire.js ../js/ArrowWire.js ../js/BezierWire.js ../js/BezierArrowWire.js ../js/TerminalProxy.js ../js/Scissors.js ../js/Terminal.js ../js/TerminalInput.js ../js/TerminalOutput.js ../js/DD.js ../js/DDResize.js ../js/Container.js ../js/Layer.js ../js/LayerMap.js ../js/ImageContainer.js ../js/ImageLabelContainer.js ../js/InOutContainer.js > wireit.js
java -jar $YUIcompressorJar  wireit.js -o wireit-min.js --charset utf8


# wireit-inputex rollup
rm -f wireit-inputex.js wireit-inputex-min.js
cat wireit.js ../plugins/inputex/lib/inputex/js/inputex.js ../plugins/inputex/lib/inputex/js/Field.js ../plugins/inputex/js/WirableField.js ../plugins/inputex/js/FormContainer.js ../plugins/inputex/lib/inputex/js/Group.js ../plugins/inputex/lib/inputex/js/fields/CombineField.js ../plugins/inputex/lib/inputex/js/fields/MultiField.js ../plugins/inputex/lib/inputex/js/Visus.js ../plugins/inputex/lib/inputex/js/widgets/Button.js ../plugins/inputex/lib/inputex/js/fields/StringField.js ../plugins/inputex/lib/inputex/js/mixins/choice.js ../plugins/inputex/lib/inputex/js/fields/SelectField.js ../plugins/inputex/lib/inputex/js/fields/EmailField.js ../plugins/inputex/lib/inputex/js/fields/UrlField.js ../plugins/inputex/lib/inputex/js/fields/ListField.js ../plugins/inputex/lib/inputex/js/fields/CheckBox.js ../plugins/inputex/lib/inputex/js/fields/Textarea.js ../plugins/inputex/lib/inputex/js/fields/AutoComplete.js ../plugins/inputex/lib/inputex/js/fields/UneditableField.js ../plugins/inputex/lib/inputex/js/fields/InPlaceEdit.js ../plugins/inputex/lib/inputex/js/fields/DynamicField.js ../plugins/inputex/lib/inputex/js/fields/DynamicTable.js ../plugins/inputex/lib/inputex/js/Table.js ../plugins/inputex/lib/inputex/js/fields/TableField.js ../plugins/inputex/lib/inputex/js/fields/KeyValueField-beta.js ../plugins/inputex/lib/inputex/js/fields/KeyOpValueField-beta.js  ../plugins/inputex/lib/inputex/js/fields/TypeField.js ../plugins/inputex/js/fields.js > wireit-inputex.js

java -jar $YUIcompressorJar  wireit-inputex.js -o wireit-inputex-min.js --charset utf8


# wireit-inputex-editor rollup
rm -f wireit-inputex-editor.js wireit-inputex-editor-min.js
cat wireit-inputex.js ../plugins/editor/js/BaseEditor.js ../plugins/editor/js/ModuleProxy.js ../plugins/editor/js/WiringEditor.js > wireit-inputex-editor.js
java -jar $YUIcompressorJar  wireit-inputex-editor.js -o wireit-inputex-editor-min.js --charset utf8


# wireit-inputex-editor-composable
rm -f wireit-inputex-editor-composable.js wireit-inputex-editor-composable-min.js
cat wireit-inputex-editor.js ../plugins/composable/js/ComposedContainer.js ../plugins/composable/js/ComposableWiringEditor.js > wireit-inputex-editor-composable.js
java -jar $YUIcompressorJar  wireit-inputex-editor-composable.js -o wireit-inputex-editor-composable-min.js --charset utf8


# wireit-inputex-editor-grouping
rm -f wireit-inputex-editor-grouping.js wireit-inputex-editor-grouping-min.js
cat wireit-inputex-editor.js ../plugins/grouping/js/Container.js.temp ../plugins/grouping/js/Group.js ../plugins/grouping/js/Grouper.js ../plugins/grouping/js/GroupFormContainer.js ../plugins/grouping/js/GroupUtils.js ../plugins/grouping/js/RubberBand.js > wireit-inputex-editor-grouping.js
java -jar $YUIcompressorJar  wireit-inputex-editor-grouping.js -o wireit-inputex-editor-grouping-min.js --charset utf8
