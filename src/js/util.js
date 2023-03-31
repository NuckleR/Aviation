function getStringBeforeSpace(str) 
{
    const spaceIndex = str.indexOf(' ');
    if (spaceIndex === -1) {
        return str;
    }
    return str.substr(0, spaceIndex);
}