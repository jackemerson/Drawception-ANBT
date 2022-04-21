(function () {
  'use strict';

  function drawSvgElement(element, context) {
    if (!context) context = anbt.context;
    context.globalCompositeOperation =
      element.getAttribute('class') === 'eraser'
        ? 'destination-out'
        : 'source-over';
    if (element.nodeName === 'path') {
      context.strokeStyle = element.getAttribute('stroke');
      context.lineWidth = element.getAttribute('stroke-width');
      context.beginPath();
      for (let i = 0; i < element.pathSegList.numberOfItems; i++) {
        const segment = element.pathSegList.getItem(i);
        if (segment.pathSegTypeAsLetter === 'M') {
          context.moveTo(segment.x, segment.y);
        } else if (segment.pathSegTypeAsLetter === 'L') {
          context.lineTo(segment.x, segment.y);
        } else if (segment.pathSegTypeAsLetter === 'Q') {
          context.quadraticCurveTo(
            segment.x1,
            segment.y1,
            segment.x,
            segment.y
          );
        } else if (segment.pathSegTypeAsLetter === 'C') {
          context.bezierCurveTo(
            segment.x1,
            segment.y1,
            segment.x2,
            segment.y2,
            segment.x,
            segment.y
          );
        }
      }
      context.stroke();
    } else if (element.nodeName === 'rect') {
      context.fillStyle = element.getAttribute('fill');
      const x = element.getAttribute('x');
      const y = element.getAttribute('y');
      const width = element.getAttribute('width');
      const height = element.getAttribute('height');
      context.fillRect(x, y, width, height);
    }
  }

  function moveSeekbar(position) {
    if (anbt.seekbarMove) anbt.seekbarMove(position);
  }

  function addToSvg(element) {
    if (anbt.rewindCache.length >= anbt.fastUndoLevels) anbt.rewindCache.pop();
    anbt.rewindCache.unshift(anbt.context.getImageData(0, 0, 600, 500));
    drawSvgElement(element);
    if (!anbt.timeEdit || anbt.position === anbt.svg.childNodes.length - 1) {
      for (let i = anbt.svg.childNodes.length - 1; i > anbt.position; i--) {
        anbt.svg.removeChild(anbt.svg.childNodes[i]);
      }
      anbt.svg.appendChild(element);
      anbt.position = anbt.svg.childNodes.length - 1;
      moveSeekbar(1);
    } else {
      anbt.svg.insertBefore(element, anbt.svg.childNodes[anbt.position + 1]);
    }
  }

  function createSvgElement(name, attributs) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      name
    );
    if (attributs) {
      Object.keys(attributs).forEach(attribut => {
        if (attributs[attribut])
          element.setAttribute(attribut, attributs[attribut]);
      });
    }
    return element;
  }

  function bindContainer(element) {
    anbt.container = element;
    anbt.canvas.width = 600;
    anbt.canvas.height = 500;
    anbt.canvas.style.background = anbt.background;
    anbt.context = anbt.canvas.getContext('2d');
    anbt.context.lineJoin = anbt.context.lineCap = 'round';
    anbt.container.appendChild(anbt.canvas);
    if (!navigator.userAgent.match(/\bPresto\b/)) {
      anbt.canvasDisplay.width = 600;
      anbt.canvasDisplay.height = 500;
      anbt.contextDisplay = anbt.canvasDisplay.getContext('2d');
      anbt.contextDisplay.lineJoin = anbt.contextDisplay.lineCap = 'round';
      anbt.container.appendChild(anbt.canvasDisplay);
    } else {
      anbt.drawDisplayLine = anbt.drawDisplayLinePresto;
    }
    anbt.container.appendChild(anbt.svgDisplay);
    const rect = createSvgElement('rect', {
      class: 'eraser',
      x: 0,
      y: 0,
      width: 600,
      height: 500,
      fill: anbt.background
    });
    anbt.svg.appendChild(rect);
  }

  function clearWithColor(color) {
    addToSvg(
      createSvgElement('rect', {
        class: color,
        x: 0,
        y: 0,
        width: 600,
        height: 500,
        fill: anbt.background
      })
    );
    anbt.lastRect = anbt.position;
  }

  function cutHistoryBeforeClearAndAfterPosition() {
    let removing = false;
    for (let i = anbt.svg.childNodes.length - 1; i > 0; i--) {
      const element = anbt.svg.childNodes[i];
      if (removing || i > anbt.position) {
        anbt.svg.removeChild(element);
      } else if (element.nodeName === 'rect' && i <= anbt.position) {
        removing = true;
        if (element.getAttribute('class') === 'eraser')
          anbt.svg.removeChild(element);
      }
    }
  }

  function drawDisplayLine(x1, y1, x2, y2) {
    const { contextDisplay } = anbt;
    contextDisplay.strokeStyle = anbt.lastColor;
    contextDisplay.lineWidth = anbt.size;
    contextDisplay.beginPath();
    contextDisplay.moveTo(x1, y1);
    contextDisplay.lineTo(x2, y2);
    contextDisplay.stroke();
  }

  function drawDisplayLinePresto(first) {
    if (first)
      anbt.svgDisplay.insertBefore(anbt.path, anbt.svgDisplay.firstChild);
  }

  function colorToRgba(color) {
    return color[0] === '#'
      ? color.length === 4
        ? [...(color.substr(1, 3) + 'F')].map(rgb => parseInt(rgb + rgb, 16))
        : (color + 'FF')
            .substr(1, 8)
            .match(/.{2}/g)
            .map(rgb => parseInt(rgb, 16))
      : color.substr(0, 4) === 'rgba'
      ? color
          .match(/[\d\.]+/g)
          .map((rgba, index) =>
            index === 3
              ? Math.floor(parseFloat(rgba) * 255)
              : parseInt(rgba, 10)
          )
      : color.substr(0, 3) === 'rgb'
      ? (color + 255).match(/[\d\.]+/g).map(rgba => parseInt(rgba, 10))
      : [0, 0, 0, 255];
  }

  function rgbToHex(rgb) {
    return (
      '#' +
      rgb
        .map((value, index) =>
          index < 3 ? ('0' + value.toString(16)).slice(-2) : ''
        )
        .join('')
    );
  }

  function colorToHex(color) {
    return rgbToHex(colorToRgba(color));
  }

  function rgbToLab(rgb) {
    const [red, green, blue] = rgb.map(value =>
      value > 10
        ? Math.pow((value / 255 + 0.055) / 1.055, 2.4)
        : value / 255 / 12.92
    );
    const [x, y, z] = [
      (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047,
      red * 0.2126 + green * 0.7152 + blue * 0.0722,
      (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883
    ].map(value =>
      value > 0.008856 ? Math.pow(value, 1 / 3) : 7.787 * value + 16 / 116
    );
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  }

  function getColorDistance(rgb1, rgb2) {
    const lab1 = rgbToLab(rgb1);
    const lab2 = rgbToLab(rgb2);
    const l = lab2[0] - lab1[0];
    const a = lab2[1] - lab1[1];
    const b = lab2[2] - lab1[2];
    return Math.sqrt(l ** 2 * 2 + a ** 2 + b ** 2);
  }

  function ID(id) {
    return document.getElementById(id);
  }

  function getClosestColor(rgb, palette) {
    if (
      ID('newcanvasyo').classList.contains('sandbox') ||
      (window.gameInfo && window.gameInfo.friend)
    )
      return rgbToHex([...rgb]);
    const distances = palette
      .slice(0)
      .map(color => getColorDistance([...rgb], colorToRgba(color)));
    const minimum = Math.min(...distances);
    const closestColor = palette[distances.indexOf(minimum)];
    return colorToHex(closestColor);
  }

  function eyedropper(x, y) {
    const pixelColor = anbt.context.getImageData(x, y, 1, 1).data;
    return pixelColor[3] > 0
      ? getClosestColor(pixelColor, anbt.palette)
      : anbt.background;
  }

  function findLastRect(endPosition) {
    if (!endPosition) endPosition = anbt.svg.childNodes.length - 1;
    for (let i = endPosition; i > 0; i--) {
      const element = anbt.svg.childNodes[i];
      if (element.nodeName === 'rect') return i;
    }
    return 0;
  }

  function formatDrawingData(drawingData) {
    const formattedData = [];
    drawingData.forEach(line => {
      const lastFormattedData = formattedData[formattedData.length - 1];
      const lineColor = colorToHex(line.getAttribute('stroke'));
      const lineWidth = parseInt(line.getAttribute('stroke-width'), 10);
      const linePath = line.getAttribute('d');
      if (
        lastFormattedData &&
        lastFormattedData.c === lineColor &&
        lastFormattedData.s === lineWidth
      ) {
        formattedData[formattedData.length - 1].p += linePath;
      } else {
        const data = {
          c: lineColor,
          s: lineWidth,
          p: linePath
        };
        formattedData.push(data);
      }
    });
    return formattedData;
  }

  function packUint32be(number) {
    return String.fromCharCode(
      (number >> 24) & 0xff,
      (number >> 16) & 0xff,
      (number >> 8) & 0xff,
      number & 0xff
    );
  }

  function setBackground(color) {
    const transparent = color === 'eraser';
    anbt.transparent = transparent;
    anbt.canvas.style.background = transparent ? 'none' : color;
    color = transparent ? '#ffffff' : colorToHex(color);
    anbt.background = color;
    anbt.svg
      .querySelectorAll('.eraser')
      .forEach(erased =>
        erased.setAttribute(
          erased.nodeName === 'path' ? 'stroke' : 'fill',
          color
        )
      );
  }

  function buildSmoothPath(points, path) {
    const { length } = points;
    if (length < 2) return;
    path.pathSegList.initialize(
      path.createSVGPathSegMovetoAbs(points[0].x, points[0].y)
    );
    if (!window.options.smoothening) {
      for (let i = 1; i < points.length; i++) {
        path.pathSegList.appendItem(
          path.createSVGPathSegLinetoAbs(points[i].x, points[i].y)
        );
      }
      return;
    }
    path.pathSegList.appendItem(
      path.createSVGPathSegLinetoAbs(points[1].x, points[1].y)
    );
    if (length < 3) return;
    let previousTangent;
    for (let i = 1; i < length - 1; i++) {
      const previousPoint = points[i - 1];
      const currentPoint = points[i];
      const nextPoint = points[i + 1];
      const dx1 = currentPoint.x - previousPoint.x;
      const dy1 = currentPoint.y - previousPoint.y;
      const angle1 = Math.atan2(dy1, dx1);
      const dist1 = Math.sqrt(dx1 ** 2 + dy1 ** 2);
      const dx2 = nextPoint.x - currentPoint.x;
      const dy2 = nextPoint.y - currentPoint.y;
      const angle2 = Math.atan2(dy2, dx2);
      const dist2 = Math.sqrt(dx2 ** 2 + dy2 ** 2);
      const tangent = (angle1 + angle2) / 2;
      if (i > 1) {
        let good = false;
        if (Math.abs(angle2 - angle1) >= Math.PI / 4) {
          path.pathSegList.appendItem(
            path.createSVGPathSegLinetoAbs(currentPoint.x, currentPoint.y)
          );
        } else {
          if (good && dist1 / dist2 >= 0.4 && dist1 / dist2 <= 2.5) {
            const t1 = {
              x: previousPoint.x + Math.cos(previousTangent) * dist1 * 0.4,
              y: previousPoint.y + Math.sin(previousTangent) * dist1 * 0.4
            };
            const t2 = {
              x: currentPoint.x - Math.cos(tangent) * dist2 * 0.4,
              y: currentPoint.y - Math.sin(tangent) * dist2 * 0.4
            };
            path.pathSegList.appendItem(
              path.createSVGPathSegCurvetoCubicAbs(
                currentPoint.x,
                currentPoint.y,
                t1.x,
                t1.y,
                t2.x,
                t2.y
              )
            );
          } else {
            path.pathSegList.appendItem(
              path.createSVGPathSegLinetoAbs(currentPoint.x, currentPoint.y)
            );
            good = true;
          }
        }
      }
      previousTangent = tangent;
    }
    const c = points[length - 1];
    path.pathSegList.appendItem(path.createSVGPathSegLinetoAbs(c.x, c.y));
  }

  function stringToBytes(binaryString) {
    return new Uint8Array(
      [...binaryString].map(character => character.charCodeAt(0))
    );
  }

  function int16be(byte1, byte2) {
    const v = (byte1 << 8) | byte2;
    return v > 32767 ? v - 65536 : v;
  }

  function unpackPlayback(bytes) {
    const { pako } = window;
    const version = bytes[0];
    let start;
    if (version === 4) {
      bytes = pako.inflate(bytes.subarray(1));
      start = 0;
    } else if (version === 3) {
      bytes = stringToBytes(pako.inflate(bytes.subarray(1), { to: 'string' }));
      start = 0;
    } else if (version === 2) {
      start = 1;
    } else {
      throw new Error(`Unsupported version: ${version}`);
    }
    const svg = createSvgElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      width: 600,
      height: 500
    });
    const last = {
      color: '#000000',
      size: 14,
      x: 0,
      y: 0,
      pattern: 0
    };
    let points = [];
    const background = `rgb(${bytes[start]}, ${bytes[start + 1]}, ${
      bytes[start + 2]
    })`;
    svg.background = background;
    svg.appendChild(
      createSvgElement('rect', {
        class: 'eraser',
        x: 0,
        y: 0,
        width: 600,
        height: 500,
        fill: background
      })
    );
    for (let i = start + 4; i < bytes.length; ) {
      let x = int16be(bytes[i], bytes[i + 1]);
      i += 2;
      let y = int16be(bytes[i], bytes[i + 1]);
      i += 2;
      if (points.length) {
        if (!x && !y) {
          const path = createSvgElement('path', {
            class: last.color === 'eraser' ? last.color : null,
            stroke: last.color === 'eraser' ? background : last.color,
            'stroke-width': last.size,
            'stroke-linejoin': 'round',
            'stroke-linecap': 'round',
            fill: 'none'
          });
          if (points.length === 1) {
            path.pathSegList.appendItem(
              path.createSVGPathSegMovetoAbs(last.x, last.y)
            );
            path.pathSegList.appendItem(
              path.createSVGPathSegLinetoAbs(last.x, last.y + 0.001)
            );
          } else {
            buildSmoothPath(points, path);
          }
          path.orig = points;
          path.pattern = last.pattern;
          svg.appendChild(path);
          points = [];
        } else {
          last.x = x += last.x;
          last.y = y += last.y;
          points.push({ x, y });
        }
      } else {
        if (x < 0) {
          if (x === -1 || x === -2) {
            last.color = `rgba(${bytes[i]}, ${bytes[i + 1]}, ${bytes[i + 2]}, ${
              bytes[i + 3] / 255
            }`;
            if (last.color === 'rgba(255,255,255,0)') last.color = 'eraser';
            i += 4;
            if (x === -1) {
              last.size = y / 100;
            } else {
              svg.appendChild(
                createSvgElement('rect', {
                  class: last.color === 'eraser' ? last.color : null,
                  x: 0,
                  y: 0,
                  width: 600,
                  height: 500,
                  fill: last.color === 'eraser' ? background : last.color
                })
              );
            }
          } else if (x === -3) {
            last.pattern = y;
            i += 4;
          }
        } else {
          points.push({ x, y });
          last.x = x;
          last.y = y;
        }
      }
    }
    return svg;
  }

  function updateView() {
    return [...anbt.svg.childNodes]
      .splice(anbt.lastRect < anbt.position ? anbt.lastRect : 0)
      .forEach(child => drawSvgElement(child));
  }

  function fromPng(buffer) {
    const dataView = new DataView(buffer);
    const magic = dataView.getUint32(0);
    if (magic !== 0x89504e47)
      throw new Error(`Invalid PNG format: ${packUint32be(magic)}`);
    for (let i = 8; i < buffer.byteLength; i += 4) {
      const chunkLength = dataView.getUint32(i);
      i += 4;
      const chunkName = packUint32be(dataView.getUint32(i));
      i += 4;
      if (chunkName === 'svGb') {
        anbt.svg = unpackPlayback(new Uint8Array(buffer, i, chunkLength));
        anbt.lastRect = 0;
        anbt.rewindCache.length = 0;
        anbt.position = anbt.svg.childNodes.length - 1;
        updateView();
        moveSeekbar(1);
        setBackground(anbt.svg.background);
        return;
      } else {
        if (chunkName === 'IEND') break;
        i += chunkLength;
      }
    }
    throw new Error('No vector data found!');
  }

  function fromLocalFile() {
    if (!anbt.fileInput) {
      anbt.fileInput = document.createElement('input');
      anbt.fileInput.style.position = 'absolute';
      anbt.fileInput.style.top = '-1000px';
      anbt.fileInput.type = 'file';
      anbt.fileInput.accept = '.png';
      document.body.appendChild(anbt.fileInput);
      anbt.fileInput.addEventListener(
        'change',
        event => {
          const reader = new FileReader();
          reader.onload = () => fromPng(reader.result);
          if (event.currentTarget.files[0])
            reader.readAsArrayBuffer(event.currentTarget.files[0]);
        },
        false
      );
    }
    anbt.fileInput.click();
  }

  function fromUrl(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    if ('responseType' in xhr) {
      xhr.responseType = 'arraybuffer';
    } else {
      return alert('Your browser is too old for this');
    }
    xhr.onload = () => fromPng(xhr.response);
    xhr.send();
  }

  function getSeekMax() {
    return anbt.svg.childNodes.length - 1;
  }

  function moveCursor(x, y) {
    if (anbt.locked) return;
    if (!anbt.brushCursor) {
      anbt.brushCursor = createSvgElement('circle', {
        'stroke-width': '1',
        stroke: '#000',
        fill: 'none'
      });
      anbt.svgDisplay.appendChild(anbt.brushCursor);
      anbt.brushCursor2 = createSvgElement('circle', {
        'stroke-width': '1',
        stroke: '#fff',
        fill: 'none'
      });
      anbt.svgDisplay.appendChild(anbt.brushCursor2);
      anbt.eyedropperCursor = createSvgElement('image', {
        width: 16,
        height: 16,
        visibility: 'hidden'
      });
      anbt.eyedropperCursor.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAARklEQVR4XoXRwQoAIAgEUf//pzeGDgq5G3PrCQqVbIAqsDz9WM2qhTX4GZgPV+JpSFxAC0PwbeVZZIpMgXvAMwoj4U9B3wGySxvzk6ZjvwAAAABJRU5ErkJggg=='
      );
      anbt.svgDisplay.appendChild(anbt.eyedropperCursor);
    }
    if (typeof x !== 'undefined') {
      anbt.brushCursor.setAttribute('cx', x);
      anbt.brushCursor.setAttribute('cy', y);
      anbt.brushCursor2.setAttribute('cx', x);
      anbt.brushCursor2.setAttribute('cy', y);
      anbt.eyedropperCursor.setAttribute('x', x - 1);
      anbt.eyedropperCursor.setAttribute('y', y - 15);
    }
    anbt.brushCursor.setAttribute('r', anbt.size / 2 + 0.5);
    anbt.brushCursor2.setAttribute('r', anbt.size / 2 - 0.5);
  }

  function getSqSegDist(point, point1, point2) {
    let { x, y } = point1;
    let dx = point2.x - x;
    let dy = point2.y - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((point.x - x) * dx + (point.y - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = point2.x;
        y = point2.y;
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = point.x - x;
    dy = point.y - y;
    return dx * dx + dy * dy;
  }

  function simplifyDouglasPeucker({ points, smoothening: sqTolerance }) {
    const length = points.length;
    const MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    const markers = new MarkerArray(length);
    let first = 0;
    let last = length - 1;
    const stack = [];
    const newPoints = [];
    markers[first] = markers[last] = 1;
    while (last) {
      let maxSqDist = 0;
      let index;
      for (let i = first + 1; i < last; i++) {
        let sqDist = getSqSegDist(points[i], points[first], points[last]);
        if (sqDist > maxSqDist) {
          index = i;
          maxSqDist = sqDist;
        }
      }
      if (maxSqDist > sqTolerance) {
        markers[index] = 1;
        stack.push(first, index, index, last);
      }
      last = stack.pop();
      first = stack.pop();
    }
    for (let i = 0; i < length; i++) {
      if (markers[i]) newPoints.push(points[i]);
    }
    return newPoints;
  }

  function strokeEnd() {
    if (anbt.locked) return;
    anbt.unsaved = true;
    const points =
      anbt.points.length > 2 ? simplifyDouglasPeucker(anbt) : anbt.points;
    buildSmoothPath(points, anbt.path);
    anbt.path.orig = points;
    addToSvg(anbt.path);
    anbt.contextDisplay && anbt.contextDisplay.clearRect(0, 0, 600, 500);
    anbt.isStroking = false;
  }

  function lock() {
    if (anbt.isStroking) strokeEnd();
    anbt.locked = true;
    moveCursor(-100, -100);
  }

  function makeCRCTable() {
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crcTable.push(c);
    }
    return crcTable;
  }

  function crc32(string, string2) {
    const crcTable = makeCRCTable();
    let crc = -1;
    for (let i = 0; i < string.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ string.charCodeAt(i)) & 0xff];
    }
    if (string2) {
      for (let i = 0; i < string2.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ string2.charCodeAt(i)) & 0xff];
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function bytesToString(bytes) {
    return [...bytes].map(byte => String.fromCharCode(byte)).join('');
  }

  function colorToDword(color) {
    return colorToRgba(color)
      .map(value => String.fromCharCode(value))
      .join('');
  }

  function packUint16be(number) {
    return String.fromCharCode((number >> 8) & 0xff, number & 0xff);
  }

  function packPlayback(svg) {
    const { pako } = window;
    const array = [colorToDword(anbt.background)];
    const last = {
      color: colorToDword('#000000'),
      size: 14,
      x: -1,
      y: -1,
      pattern: 0
    };
    svg.childNodes.forEach(element => {
      if (element.nodeName === 'path') {
        const color =
          element.getAttribute('class') === 'eraser'
            ? '\xFF\xFF\xFF\x00'
            : colorToDword(element.getAttribute('stroke'));
        const size = element.getAttribute('stroke-width');
        const pattern = element.pattern || 0;
        if (color !== last.color || size !== last.size) {
          array.push(packUint16be(-1));
          array.push(packUint16be(size * 100));
          array.push(color);
          last.color = color;
          last.size = size;
        }
        if (pattern !== last.pattern) {
          array.push(packUint16be(-3));
          array.push(packUint16be(pattern));
          array.push('\x00\x00\x00\x00');
          last.pattern = pattern;
        }
        last.x = element.orig[0].x;
        last.y = element.orig[0].y;
        array.push(packUint16be(last.x));
        array.push(packUint16be(last.y));
        for (let j = 1; j < element.orig.length; j++) {
          const dx = element.orig[j].x - last.x;
          const dy = element.orig[j].y - last.y;
          if (!dx && !dy) continue;
          array.push(packUint16be(dx));
          array.push(packUint16be(dy));
          last.x = element.orig[j].x;
          last.y = element.orig[j].y;
        }
        array.push('\x00\x00\x00\x00');
      } else if (element.nodeName === 'rect') {
        const color = colorToDword(element.getAttribute('fill'));
        array.push(packUint16be(-2));
        array.push(packUint16be(0));
        array.push(color);
      } else {
        throw new Error('Unknown node name: ' + element.nodeName);
      }
    });
    return '\x04' + bytesToString(pako.deflate(stringToBytes(array.join(''))));
  }

  function makePng(width, height, fromBuffer) {
    cutHistoryBeforeClearAndAfterPosition();
    moveSeekbar(1);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!anbt.transparent) {
      context.fillStyle = anbt.background;
      context.fillRect(0, 0, width, height);
    }
    if (fromBuffer) {
      context.drawImage(anbt.canvas, 0, 0, width, height);
    } else {
      context.lineJoin = context.lineCap = 'round';
      context.scale(width / 600, height / 500);
      for (let i = 0; i < anbt.svg.childNodes.length; i++) {
        drawSvgElement(anbt.svg.childNodes[i], context);
      }
    }
    anbt.pngBase64 = canvas.toDataURL('image/png');
    const version = 'svGb';
    const svgString = packPlayback(anbt.svg);
    const padding = anbt.pngBase64.substr(-2);
    const cut = padding === '==' ? 1 : padding[1] === '=' ? 2 : 3;
    const indexEnd = atob(anbt.pngBase64.substr(-20)).substr(cut);
    const prepend = atob(anbt.pngBase64.substr(-20)).substr(0, cut);
    const custom = [
      prepend,
      packUint32be(svgString.length),
      version,
      svgString,
      packUint32be(crc32(version, svgString)),
      indexEnd
    ].join('');
    anbt.pngBase64 =
      anbt.pngBase64.substr(0, anbt.pngBase64.length - 20) + btoa(custom);
  }

  function pause(noSeekbar) {
    if (!anbt.isPlaying) return;
    if (anbt.isAnimating) {
      anbt.isAnimating = false;
      anbt.svgDisplay.removeChild(anbt.path);
      drawSvgElement(anbt.animatePath);
      anbt.position++;
      if (!noSeekbar)
        moveSeekbar(anbt.position / (anbt.svg.childNodes.length - 1));
    }
    anbt.isPlaying = false;
  }

  function playTimer() {
    if (!anbt.isPlaying) return;
    const positionMax = anbt.svg.childNodes.length - 1;
    let { delay } = anbt;
    let indexMax = 0;
    if (anbt.position < positionMax || anbt.isAnimating) {
      if (anbt.isAnimating) {
        indexMax = anbt.animatePath.pathSegList.numberOfItems - 1;
        if (anbt.animateIndex < indexMax) {
          const segment = anbt.animatePath.pathSegList.getItem(
            anbt.animateIndex
          );
          const newSegment =
            segment.pathSegTypeAsLetter === 'L'
              ? anbt.path.createSVGPathSegLinetoAbs(segment.x, segment.y)
              : segment.pathSegTypeAsLetter === 'Q'
              ? anbt.path.createSVGPathSegCurvetoQuadraticAbs(
                  segment.x,
                  segment.y,
                  segment.x1,
                  segment.y1
                )
              : segment.pathSegTypeAsLetter === 'C' &&
                anbt.path.createSVGPathSegCurvetoCubicAbs(
                  segment.x,
                  segment.y,
                  segment.x1,
                  segment.y1,
                  segment.x2,
                  segment.y2
                );
          anbt.path.pathSegList.appendItem(newSegment);
          anbt.animateIndex++;
        } else {
          anbt.isAnimating = false;
          anbt.svgDisplay.removeChild(anbt.path);
          drawSvgElement(anbt.animatePath);
          anbt.position++;
          anbt.animateIndex = 0;
        }
        delay /= 6;
      } else {
        const element = anbt.svg.childNodes[anbt.position + 1];
        if (element.nodeName === 'path') {
          anbt.isAnimating = true;
          anbt.animatePath = element;
          anbt.animateIndex = 1;
          anbt.path = element.cloneNode(true);
          const segment = element.pathSegList.getItem(0);
          anbt.path.pathSegList.initialize(
            anbt.path.createSVGPathSegMovetoAbs(segment.x, segment.y)
          );
          anbt.svgDisplay.insertBefore(anbt.path, anbt.svgDisplay.firstChild);
        } else {
          drawSvgElement(element);
          anbt.position++;
        }
      }
    }
    moveSeekbar(
      (anbt.position + (indexMax ? anbt.animateIndex / indexMax : 0)) /
        positionMax
    );
    if (anbt.position < positionMax) {
      setTimeout(anbt.playTimer, delay);
    } else {
      pause();
    }
  }

  function play() {
    if (anbt.locked) return;
    anbt.rewindCache.length = 0;
    if (anbt.position === anbt.svg.childNodes.length - 1) {
      if (anbt.position === 0) return moveSeekbar(1);
      anbt.position = 0;
      moveSeekbar(0);
      drawSvgElement(anbt.svg.childNodes[0]);
    }
    anbt.isPlaying = true;
    playTimer();
  }

  function seek(newPosition) {
    if (anbt.locked) return;
    let start = -1;
    pause(true);
    if (newPosition === anbt.position) return;
    if (newPosition < anbt.position) {
      const rewindSteps = anbt.position - newPosition;
      if (rewindSteps <= anbt.rewindCache.length) {
        anbt.context.putImageData(anbt.rewindCache[rewindSteps - 1], 0, 0);
        anbt.rewindCache.splice(0, rewindSteps);
      } else {
        start =
          anbt.lastRect <= newPosition
            ? anbt.lastRect
            : findLastRect(newPosition);
        drawSvgElement(anbt.svg.childNodes[start]);
      }
    } else if (newPosition > anbt.position) {
      start = anbt.position;
    }
    if (start !== -1) {
      const forwardSteps = newPosition - start;
      if (forwardSteps >= anbt.fastUndoLevels) {
        anbt.rewindCache.length = 0;
      } else {
        const { length } = anbt.rewindCache;
        const numRemove = Math.min(
          length,
          newPosition - start + length - anbt.fastUndoLevels
        );
        anbt.rewindCache.splice(length - numRemove, numRemove);
      }
      for (let i = start + 1; i <= newPosition; i++) {
        if (newPosition - i < anbt.fastUndoLevels)
          anbt.rewindCache.unshift(anbt.context.getImageData(0, 0, 600, 500));
        drawSvgElement(anbt.svg.childNodes[i]);
      }
    }
    anbt.position = newPosition;
  }

  function redo() {
    if (anbt.locked) return;
    const positionMax = anbt.svg.childNodes.length - 1;
    if (anbt.position < positionMax) {
      seek(anbt.position + 1);
      moveSeekbar(anbt.position / positionMax);
    }
  }

  function requestSave(dataUrl, extension) {
    if (!dataUrl) {
      dataUrl = anbt.pngBase64;
      extension = '.png';
      anbt.unsaved = false;
    }
    if (!anbt.saveLink) {
      anbt.saveLink = document.createElement('a');
      document.body.appendChild(anbt.saveLink);
    }
    if ('download' in anbt.saveLink) {
      anbt.saveLink.href = dataUrl;
      const date = new Date();
      anbt.saveLink.download = [
        'DrawingInTime_',
        date.getFullYear(),
        '_',
        (101 + date.getMonth() + '').slice(-2),
        (100 + date.getDate() + '').slice(-2),
        '_',
        (100 + date.getHours() + '').slice(-2),
        (100 + date.getMinutes() + '').slice(-2),
        (100 + date.getSeconds() + '').slice(-2),
        extension
      ].join('');
      anbt.saveLink.click();
    } else {
      window.open(dataUrl);
    }
    return true;
  }

  function setColor(number, color) {
    anbt.colors[number] = color;
  }

  function setSeekbarMove(func) {
    anbt.seekbarMove = func;
  }

  function setSize(size) {
    anbt.size = size;
    moveCursor();
  }

  function showEyedropperCursor(isEyedropper) {
    if (!anbt.brushCursor) return;
    const visibility = isEyedropper ? 'hidden' : 'visible';
    const visibility2 = isEyedropper ? 'visible' : 'hidden';
    anbt.brushCursor.setAttribute('visibility', visibility);
    anbt.brushCursor2.setAttribute('visibility', visibility);
    anbt.eyedropperCursor.setAttribute('visibility', visibility2);
  }

  function strokeAdd(x, y) {
    if (anbt.locked) return;
    if (!anbt.isStroking) throw new Error('StrokeAdd without StrokeBegin!');
    const point = anbt.points[anbt.points.length - 1];
    if (point.x === x && point.y === y) return;
    if (anbt.blot) {
      anbt.path.pathSegList.removeItem(1);
      anbt.blot = false;
    }
    anbt.path.pathSegList.appendItem(anbt.path.createSVGPathSegLinetoAbs(x, y));
    if (navigator.userAgent.match(/\bPresto\b/)) {
      drawDisplayLinePresto(false);
    } else {
      drawDisplayLine(point.x, point.y, x, y);
    }
    anbt.points.push({ x, y });
  }

  function strokeBegin(x, y, left = null, forceEraser = false) {
    if (anbt.locked) return;
    let color;
    if (forceEraser) {
      color = 'eraser';
    } else if (left !== null) {
      anbt.lastPalette = left;
      color = left ? anbt.colors[0] : anbt.colors[1];
    } else {
      anbt.lastPalette = anbt.lastPalette ?? 1;
      color = anbt.lastPalette ? anbt.colors[0] : anbt.colors[1];
    }
    const cls = color === 'eraser' ? color : null;
    color = color === 'eraser' ? anbt.background : color;
    anbt.path = createSvgElement('path', {
      class: cls,
      stroke: color,
      'stroke-width': anbt.size,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round',
      fill: 'none'
    });
    anbt.lastColor = color;
    anbt.path.pattern = anbt.pattern;
    anbt.path.pathSegList.appendItem(anbt.path.createSVGPathSegMovetoAbs(x, y));
    anbt.path.pathSegList.appendItem(
      anbt.path.createSVGPathSegLinetoAbs(x, y + 0.001)
    );
    if (navigator.userAgent.match(/\bPresto\b/)) {
      drawDisplayLinePresto(true);
    } else {
      drawDisplayLine(x, y, x, y + 0.001);
    }
    anbt.points = [];
    anbt.points.push({ x, y });
    anbt.blot = true;
    anbt.isStroking = true;
  }

  function undo() {
    if (anbt.locked) return;
    if (anbt.position === 0) return;
    seek(anbt.position - 1);
    moveSeekbar(anbt.position / (anbt.svg.childNodes.length - 1));
  }

  function unlock() {
    anbt.locked = false;
  }

  function uploadToDrawception(callback) {
    const { pako } = window;
    const pathList = [...anbt.svg.childNodes].filter(
      childNode => childNode.nodeName === 'path'
    );
    const base = {
      v: 1,
      w: 600,
      h: 500,
      t: 0,
      th: anbt.paletteID,
      bg: anbt.background,
      p: 1,
      s: 0.7,
      actions: formatDrawingData(pathList)
    };
    const drawdata = btoa(
      pako
        .gzip(JSON.stringify(base))
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const request = new XMLHttpRequest();
    request.open('POST', 'https://drawception.com/sandbox/upload.json');
    request.onload = () => {
      let response = request.responseText;
      try {
        response = JSON.parse(response);
      } catch (e) {}
      callback(response);
    };
    request.onerror = error => callback(`error: ${error}`);
    request.send(JSON.stringify({ drawdata }));
  }

  function base64ToBytes(base64) {
    return stringToBytes(atob(base64));
  }

  function uploadToImgur(callback) {
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.imgur.com/3/image');
    request.onload = () => {
      let response = request.responseText;
      try {
        response = JSON.parse(response);
      } catch (error) {
        console.error(error);
      }
      console.log(response);
      if (response.success) {
        const request2 = new XMLHttpRequest();
        request2.open(
          'POST',
          'https://api.imgur.com/3/image/' + response.data.deletehash
        );
        request2.setRequestHeader('Authorization', 'Client-ID 4809db83c8897af');
        const formData = new FormData();
        formData.append(
          'description',
          'Playback: http://grompe.org.ru/drawit/#' + response.data.id
        );
        request2.send(formData);
      }
      callback(response);
    };
    request.onerror = error => callback(`error: ${error}`);
    request.setRequestHeader('Authorization', 'Client-ID 4809db83c8897af');
    const formData = new FormData();
    formData.append(
      'image',
      new Blob([base64ToBytes(anbt.pngBase64.substr(22)).buffer], {
        type: 'image/png'
      })
    );
    formData.append('type', 'file');
    formData.append('title', 'Made with Drawing in Time');
    formData.append('description', 'http://grompe.org.ru/drawit/');
    request.send(formData);
  }

  const palettes = {
    Normal: [
      '#000000',
      '#444444',
      '#999999',
      '#ffffff',
      '#603913',
      '#c69c6d',
      '#ffdab9',
      '#ff0000',
      '#ffd700',
      '#ff6600',
      '#16ff00',
      '#0fad00',
      '#00ffff',
      '#0247fe',
      '#ec008c',
      '#8601af',
      '#fffdc9'
    ],
    Sepia: [
      '#402305',
      '#503315',
      '#604325',
      '#705335',
      '#806345',
      '#907355',
      '#a08365',
      '#b09375',
      '#bfa284',
      '#cfb294',
      '#dfc2a4',
      '#ffe2c4'
    ],
    Grayscale: [
      '#000000',
      '#ffffff',
      '#151515',
      '#2a2a2a',
      '#3f3f3f',
      '#555555',
      '#6a6a6a',
      '#7f7f7f',
      '#949494',
      '#aaaaaa',
      '#bfbfbf',
      '#d4d4d4',
      '#e9e9e9'
    ],
    'Black and white': ['#ffffff', '#000000'],
    CGA: [
      '#555555',
      '#000000',
      '#0000aa',
      '#5555ff',
      '#00aa00',
      '#55ff55',
      '#00aaaa',
      '#55ffff',
      '#aa0000',
      '#ff5555',
      '#aa00aa',
      '#ff55ff',
      '#aa5500',
      '#ffff55',
      '#aaaaaa',
      '#ffffff'
    ],
    Gameboy: ['#8bac0f', '#9bbc0f', '#306230', '#0f380f'],
    Neon: [
      '#ffffff',
      '#000000',
      '#adfd09',
      '#f3f315',
      '#feac09',
      '#fe0bab',
      '#ad0bfb',
      '#00abff'
    ],
    Thanksgiving: [
      '#673718',
      '#3c2d27',
      '#c23322',
      '#850005',
      '#c67200',
      '#77785b',
      '#5e6524',
      '#cfb178',
      '#f5e9ce'
    ],
    Holiday_old: [
      '#3d9949',
      '#7bbd82',
      '#7d1a0c',
      '#bf2a23',
      '#fdd017',
      '#00b7f1',
      '#bababa',
      '#ffffff'
    ],
    "Valentine's": [
      '#2d1014',
      '#ffffff',
      '#600d17',
      '#c2113a',
      '#b71d1d',
      '#e54d5a',
      '#ff7d63',
      '#fd8647',
      '#fed067',
      '#ffe4b7',
      '#fdc0c6'
    ],
    Halloween: [
      '#444444',
      '#000000',
      '#999999',
      '#ffffff',
      '#603913',
      '#c69c6d',
      '#7a0e0e',
      '#b40528',
      '#fd2119',
      '#fa5b11',
      '#faa611',
      '#ffd700',
      '#602749',
      '#724b97',
      '#bef202',
      '#519548',
      '#b2bb1e'
    ],
    'the blues': [
      '#b6cbe4',
      '#618abc',
      '#d0d5ce',
      '#82a2a1',
      '#92b8c1',
      '#607884',
      '#c19292',
      '#8c2c2c',
      '#295c6f'
    ],
    Spring: [
      '#9ed396',
      '#57b947',
      '#4d7736',
      '#365431',
      '#231302',
      '#3e2409',
      '#a66621',
      '#a67e21',
      '#ebbb49',
      '#ffc0cb',
      '#ffffff'
    ],
    Beach: [
      '#1ca4d2',
      '#65bbe2',
      '#6ab7bf',
      '#94cbda',
      '#9cbf80',
      '#d2e1ab',
      '#b8a593',
      '#d7cfb9',
      '#dc863e',
      '#f7dca2'
    ],
    'Tide Pool': [
      '#ffe8b9',
      '#fad489',
      '#ffb44c',
      '#d6b1de',
      '#b197a8',
      '#e5f2ff',
      '#a1ffb8',
      '#53e6ef',
      '#3ad3a8',
      '#1ca4d2',
      '#2271a2'
    ],
    'Colors of 2016': [
      '#91a7d0',
      '#f6cac9',
      '#eb9587',
      '#776a5f',
      '#d1c2ab',
      '#a39d9d',
      '#648589'
    ],
    Bee: ['#000000', '#7a5c00', '#b58800', '#eab618', '#f6de97', '#ffffff'],
    'Colors of 2017': [
      '#86af49',
      '#44883d',
      '#1f4478',
      '#0062a3',
      '#00939a',
      '#59c9d5',
      '#8a9a9a',
      '#5f7278'
    ],
    'Fire and Ice': [
      '#520909',
      '#b40528',
      '#fd2119',
      '#faa611',
      '#ffe96a',
      '#ffffff',
      '#69ddff',
      '#1c8ae5',
      '#0a3fa9',
      '#040526'
    ],
    'Canyon Sunset': [
      '#fce3ca',
      '#feb789',
      '#f27c8a',
      '#af5081',
      '#8e6dae',
      '#5f4a8b',
      '#2e1b50'
    ],
    Juice: [
      '#f3ab54',
      '#ec5e66',
      '#ab5871',
      '#f2a19b',
      '#f9f4d4',
      '#fadfb7',
      '#869e3c',
      '#cbdd7e',
      '#fced95'
    ],
    Tropical: [
      '#f68357',
      '#fbc040',
      '#fefa56',
      '#fef0f5',
      '#90fc51',
      '#07f182',
      '#1d6ab2',
      '#12041b',
      '#2f0946'
    ],
    'Grimby Grays': [
      '#000000',
      '#ffffff',
      '#2f3032',
      '#252422',
      '#545758',
      '#4b4a46',
      '#797d80',
      '#71706c',
      '#9ea1a4',
      '#979692',
      '#c4c8cb',
      '#d7d6d2',
      '#dee1e4',
      '#f0efeb'
    ],
    'DawnBringer 16': [
      '#140c1c',
      '#442434',
      '#30346d',
      '#4e4a4e',
      '#854c30',
      '#346524',
      '#d04648',
      '#757161',
      '#597dce',
      '#d27d2c',
      '#8595a1',
      '#6daa2c',
      '#d2aa99',
      '#6dc2ca',
      '#dad45e',
      '#deeed6'
    ],
    'Fury Road': [
      '#020c16',
      '#023745',
      '#08616d',
      '#36d4b6',
      '#0afef6',
      '#fce173',
      '#e29f30',
      '#b56942',
      '#ad3f16',
      '#893f1d'
    ],
    Candy: [
      '#06063c',
      '#4f95ff',
      '#68f9ff',
      '#fffef9',
      '#ff96f8',
      '#ff44d3',
      '#793abd'
    ],
    Holiday: [
      '#e91434',
      '#97200a',
      '#c66a20',
      '#fdbe30',
      '#688625',
      '#004f28',
      '#112825',
      '#1c69bf',
      '#6096d3',
      '#a5c4e6',
      '#f7d9f0',
      '#f6f6f6'
    ],
    Blues: [
      '#929aa8',
      '#896868',
      '#546c7d',
      '#633d3d',
      '#284660',
      '#421f29',
      '#232e3f',
      '#0f1328'
    ],
    'Sin City': ['#ffffff', '#ff0000', '#000000'],
    'Lucky Clover': [
      '#ffffff',
      '#fcf4c4',
      '#f7b307',
      '#fc8404',
      '#cd7a14',
      '#9bf23e',
      '#40d910',
      '#34900b',
      '#0c442c'
    ],
    "D's Exclusive": [
      '#000000',
      '#717474',
      '#ffffff',
      '#f25b99',
      '#e4965e',
      '#ffc416',
      '#ffe38f',
      '#0074d9',
      '#09a3ec',
      '#12d1ff',
      '#bcf5ff',
      '#0ee446'
    ],
    'Retina Burn': ['#bc0bff', '#ff0b11'],
    Easter: [
      '#9678ba',
      '#bc9ff0',
      '#e4ccff',
      '#ffa1f1',
      '#fbd0ee',
      '#e6f2ff',
      '#aaedfb',
      '#f4dc7b',
      '#fdfabd',
      '#a1ef85',
      '#ddf7a8'
    ],
    Neapolitan: ['#3f3245', '#ff5c98', '#ecb2a4', '#fff7e1'],
    Lemonade: [
      '#645f87',
      '#37aab4',
      '#8ce6c3',
      '#d7ffb4',
      '#ff7d91',
      '#ffaaa5',
      '#ffd2af',
      '#ffebaa'
    ],
    'School Pen': ['#07207a', '#000000', '#d8110c', '#097536', '#fbfcfd'],
    Dimmed: [
      '#c2aa78',
      '#fcfeb4',
      '#92c67d',
      '#5cab8b',
      '#182e45',
      '#221b30',
      '#722c31',
      '#441a23',
      '#1c0b11'
    ],
    Treasure: [
      '#e8c4b5',
      '#c6a48e',
      '#ebc260',
      '#dea338',
      '#c8832a',
      '#b3454d',
      '#7c3035',
      '#412a23'
    ],
    'Witches Brew': [
      '#e9eeae',
      '#bbd9bf',
      '#6c8e8f',
      '#516374',
      '#373a55',
      '#271d3a',
      '#100b16'
    ],
    'Wilting Rose': [
      '#311e31',
      '#284b41',
      '#369486',
      '#70cbbd',
      '#f5ebd2',
      '#643241',
      '#b4556e',
      '#c8aac8',
      '#e6c3c3'
    ],
    Frosty: [
      '#aedee3',
      '#fec083',
      '#ff6013',
      '#9a594b',
      '#9f747f',
      '#4f352f',
      '#426277',
      '#7d849b',
      '#f2f3f7'
    ],
    'Clown Town': [
      '#ec4848',
      '#f07da6',
      '#f5b8f5',
      '#feca50',
      '#101d1c',
      '#403c42',
      '#546d83',
      '#4450db',
      '#51ceb1',
      '#e1f1f2'
    ]
  };

  const anbt = {
    container: null,
    svg: createSvgElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      width: '600',
      height: '500'
    }),
    canvas: document.createElement('canvas'),
    canvasDisplay: document.createElement('canvas'),
    svgDisplay: createSvgElement('svg', {
      version: '1.1',
      width: '600',
      height: '500',
      'pointer-events': 'none'
    }),
    path: null,
    points: null,
    pngBase64: null,
    lastRect: 0,
    position: 0,
    isStroking: false,
    isPlaying: false,
    isFocused: false,
    size: 14,
    smoothening: 1,
    palette: palettes.Normal,
    patternCache: {},
    delay: 100,
    unsaved: false,
    background: '#fffdc9',
    transparent: false,
    colors: ['#000000', 'eraser'],
    eyedropperActive: false,
    fastUndoLevels: 10,
    rewindCache: [],
    bindContainer,
    packPlayback,
    unpackPlayback,
    findLastRect,
    cutHistoryBeforeClearAndAfterPosition,
    makePng,
    fromPng,
    fromUrl,
    fromLocalFile,
    setBackground,
    setColor,
    setSize,
    drawSvgElement,
    updateView,
    drawDisplayLinePresto,
    drawDisplayLine,
    strokeBegin,
    strokeEnd,
    strokeAdd,
    clearWithColor,
    addToSvg,
    undo,
    redo,
    moveSeekbar,
    setSeekbarMove,
    getSeekMax,
    seek,
    play,
    playTimer,
    pause,
    moveCursor,
    showEyedropperCursor,
    eyedropper,
    requestSave,
    uploadToImgur,
    lock,
    unlock,
    formatDrawingData,
    uploadToDrawception
  };

  const globals = {
    rectangle: {},
    touchSingle: false,
    lastTouch: {},
    lastSeenColorToHighlight: anbt.background,
    brushSizes: [2, 6, 14, 42],
    timerStart: 0
  };

  let incrementalSize = Number(anbt.size);
  function changeBrushSize(event) {
    event.preventDefault();
    const size = [...event.currentTarget.classList]
      .filter(htmlClass => htmlClass.startsWith('size-'))[0]
      .match(/\d+/)[0];
    setSize(Number(size));
    resetIncrement();
    console.log(`Size reset: ${incrementalSize}, size ${anbt.size}`);
    const element = ID('tools').querySelector('.sel');
    if (element) element.classList.remove('sel');
    event.currentTarget.classList.add('sel');
    if (!anbt.isStroking) return;
    strokeEnd();
    const lastPoint = anbt.points[anbt.points.length - 1];
    strokeBegin(lastPoint.x, lastPoint.y);
  }
  function modifyBrushSize(modifier) {
    const MIN = 0,
      MAX = globals.brushSizes.length - 1;
    const size = globals.brushSizes.indexOf(Number(anbt.size));
    const newSize = Math.min(Math.max(MIN, size + modifier), MAX);
    setSize(globals.brushSizes[newSize]);
    resetIncrement();
    if (!anbt.isStroking) return;
    strokeEnd();
    const lastPoint = anbt.points[anbt.points.length - 1];
    strokeBegin(lastPoint.x, lastPoint.y);
  }
  function softModifyBrushSize(step) {
    let currentBrush = globals.brushSizes.indexOf(Number(anbt.size));
    if (
      (currentBrush === 0 && step === -1) ||
      (currentBrush === globals.brushSizes.length - 1 && step === 1)
    ) {
      console.log(`No further steps: ${step}`);
      return;
    }
    let currentSize = Number(anbt.size);
    let nextSize = Number(globals.brushSizes[currentBrush + step]);
    const MIN = globals.brushSizes[0];
    const MAX = globals.brushSizes[globals.brushSizes.length - 1];
    incrementalSize = Math.min(MAX, Math.Max(MIN, incrementalSize + step));
    console.log(`Increment: ${incrementalSize}, Current: ${anbt.size}`);
    let currentDiff = Math.abs(currentSize - incrementalSize);
    let nextDiff = Math.abs(nextSize - incrementalSize);
    if (nextDiff < currentDiff) {
      modifyBrushSize(step);
    }
  }
  function resetIncrement() {
    incrementalSize = Number(anbt.size);
  }

  function clickRedo(event) {
    event.preventDefault();
    ID('play').classList.remove('pause');
    redo();
  }

  function updateChooseBackground(chooseBackground) {
    globals.chooseBackground = chooseBackground;
    ID('colors').classList.toggle('setbackground');
    ID('setbackground').classList.toggle('sel');
  }

  function clickSetBackground(event) {
    event.preventDefault();
    updateChooseBackground(!globals.chooseBackground);
  }

  function clickTrash(event) {
    event.preventDefault();
    clearWithColor('eraser');
    if (ID('newcanvasyo').classList.contains('sandbox'))
      globals.timerStart = Date.now();
  }

  function clickUndo(event) {
    event.preventDefault();
    ID('play').classList.remove('pause');
    undo();
  }

  function getPointerType() {
    return ID('wacom') && ID('wacom').penAPI && ID('wacom').penAPI.isWacom
      ? ID('wacom').penAPI.pointerType
      : 0;
  }

  function updateColorIndicators() {
    const { colors } = anbt;
    ['primary', 'secondary'].forEach((id, index) => {
      if (colors[index] === 'eraser') {
        ID(id).style.backgroundColor = 'pink';
        ID(id).classList.add('eraser');
      } else {
        ID(id).style.backgroundColor = colors[index];
        ID(id).classList.remove('eraser');
      }
    });
  }

  function colorClick(event) {
    if (event.touches || event.button === 0 || event.button === 2) {
      event.preventDefault();
      const colorButton = event.currentTarget;
      let color = colorButton.style.backgroundColor;
      if (globals.chooseBackground) {
        if (colorButton.id !== 'eraser') setBackground(color);
        updateChooseBackground(false);
      } else {
        if (colorButton.id === 'eraser') color = 'eraser';
        if (event.button === 2 || getPointerType() === 3) {
          setColor(1, color);
        } else {
          setColor(0, color);
        }
        updateColorIndicators();
      }
    }
  }

  function playCommonDown(event) {
    event.stopPropagation();
    event.preventDefault();
    ID('play').classList.toggle('pause');
    if (anbt.isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function removeEyedropper(event) {
    if (event.altKey) return;
    anbt.eyedropperActive = false;
    event.currentTarget.classList.remove('hidecursor');
    showEyedropperCursor(false);
    event.currentTarget.removeEventListener('mousemove', removeEyedropper);
  }

  function keyDown(event) {
    const { options } = window;
    if (document.activeElement instanceof HTMLInputElement) return true;
    {
      switch (event.code) {
        case 'KeyP':
          console.log(anbt);
          return;
        case 'KeyR':
          if (!event.ctrlKey) {
            localStorage.removeItem('anbt_canvasHTML_last_cached');
            location.reload();
            return;
          }
          break;
      }
    }
    let codeMatch, keyMatch;
    codeMatch = keyMatch = false;
    codeMatch = true;
    switch (event.code) {
      case 'AltLeft':
      case 'AltRight':
        if (!navigator.userAgent.match(/\bPresto\b/)) {
          ID('svgContainer').addEventListener('mousemove', removeEyedropper);
        }
      case 'KeyI': {
        const active = anbt.eyedropperActive;
        const activate = !active || event.altKey;
        anbt.eyedropperActive = activate;
        ID('svgContainer').classList.toggle('hidecursor', activate);
        showEyedropperCursor(activate);
        break;
      }
      case 'KeyQ':
        options.colorDoublePress = !options.colorDoublePress;
        break;
      case 'Backspace':
        if (!anbt.unsaved) return;
      case 'KeyZ':
        ID('play').classList.remove('pause');
        undo();
        break;
      case 'KeyY':
        ID('play').classList.remove('pause');
        redo();
        break;
      case 'KeyX': {
        const [color0, color1] = anbt.colors;
        setColor(0, color1);
        setColor(1, color0);
        updateColorIndicators();
        if (anbt.isStroking) {
          strokeEnd();
          const lastPoint = anbt.points[anbt.points.length - 1];
          strokeBegin(lastPoint.x, lastPoint.y);
        }
        break;
      }
      case 'KeyB':
        if (ID('setbackground').hidden) return;
        updateChooseBackground(!globals.chooseBackground);
        break;
      case 'E':
        if (event.ctrlKey || event.metaKey) return;
        setColor(0, 'eraser');
        updateColorIndicators();
        break;
      case 'BracketLeft':
      case 'NumpadSubtract':
      case 'Minus':
      case 'Comma':
        if (event.ctrlKey || event.metaKey) return;
        for (let i = 1; i < globals.brushSizes.length; i++) {
          if (anbt.size - globals.brushSizes[i] < 0.01) {
            ID('brush' + (i - 1)).click();
            break;
          }
        }
        break;
      case 'BracketRight':
      case 'NumpadAdd':
      case 'Equal':
      case 'Period':
        if (event.ctrlKey || event.metaKey) return;
        for (let i = 0; i < globals.brushSizes.length - 1; i++) {
          if (anbt.size - globals.brushSizes[i] < 0.01) {
            ID('brush' + (i + 1)).click();
            break;
          }
        }
        break;
      case 'space':
        if (event.altKey || event.shiftKey) return;
        if (!event.ctrlKey && !event.metaKey) return;
        playCommonDown(event);
        break;
      default: {
        codeMatch = false;
        break;
      }
    }
    let regex = /^\d$/;
    if (event.key.search(regex) === 0 && options.colorNumberShortcuts) {
      const digit = Number(event.key);
      keyMatch = true;
      if ((0 < digit) & (digit <= 4) && (event.ctrlKey || event.metaKey)) {
        ID(`brush${digit - 1}`).click();
      } else {
        let index = digit;
        if (
          event.shiftKey ||
          (options.colorDoublePress && anbt.previousColorKey === index)
        ) {
          index += 8;
          anbt.previousColorKey = index;
        }
        if (options.colorDoublePress) {
          if (anbt.previousColorKeyTimer)
            clearTimeout(anbt.previousColorKeyTimer);
          anbt.previousColorKeyTimer = setTimeout(
            () => (anbt.previousColorKey = -1),
            500
          );
        }
        const elements = ID('colors').querySelectorAll('b');
        if (index < elements.length) {
          const color =
            elements[index].id === 'eraser'
              ? 'eraser'
              : elements[index].style.backgroundColor;
          if (globals.chooseBackground) {
            if (color !== 'eraser') setBackground(color);
            updateChooseBackground(false);
          } else {
            setColor(anbt.lastPalette ?? 0, color);
            updateColorIndicators();
          }
        }
        if (anbt.isStroking) {
          strokeEnd();
          const lastPoint = anbt.points[anbt.points.length - 1];
          strokeBegin(lastPoint.x, lastPoint.y);
        }
      }
    }
    if (codeMatch || keyMatch) event.preventDefault();
    return;
  }

  function trackFocus(event) {
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (anbt.container !== null) {
      if (
        target.isEqualNode(anbt.container) ||
        anbt.container.contains(target)
      ) {
        anbt.isFocused = true;
        return;
      }
    }
    anbt.isFocused = false;
  }
  function playerIsDrawing() {
    return anbt.isFocused || anbt.isStroking;
  }

  function keyUp(event) {
    if (event.key !== 'Alt') return;
    ID('svgContainer').classList.remove('hidecursor');
    showEyedropperCursor(false);
    if (playerIsDrawing()) {
      event.preventDefault();
    }
  }

  function warnStrokesAfterPosition() {
    return (
      anbt.position < getSeekMax() &&
      !confirm('Strokes after current position will be discarded. Continue?')
    );
  }

  function doExport(event) {
    event.preventDefault();
    if (warnStrokesAfterPosition()) return;
    makePng(600, 500, true);
    requestSave();
  }

  function doImport(event) {
    event.preventDefault();
    ID('svgContainer').classList.add('loading');
    fromLocalFile();
    ID('svgContainer').classList.remove('loading');
  }

  function exportToDrawception(event) {
    event.preventDefault();
    if (warnStrokesAfterPosition()) return;
    ID('drawception').childNodes[0].nodeValue = 'Uploading...';
    ID('drawception').disabled = true;
    uploadToDrawception(request => {
      ID('drawception').childNodes[0].nodeValue = 'Upload to Drawception';
      ID('drawceptionpopup').classList.add('show');
      ID('drawceptionpopuptitle').childNodes[0].nodeValue =
        'Drawception upload result';
      if (request && request.url) {
        anbt.unsaved = false;
        ID('drawceptionurl').href = request.url;
        ID('drawceptionurl').childNodes[0].nodeValue = 'Uploaded image';
        if (window.inForum) {
          window.frameElement.ownerDocument.getElementById(
            'input-comment'
          ).value += `![](${request.url})`;
        }
      }
      ID('drawception').disabled = false;
    });
  }

  function exportToImgur(event) {
    event.preventDefault();
    if (warnStrokesAfterPosition()) return;
    ID('imgur').childNodes[0].nodeValue = 'Uploading...';
    ID('imgur').disabled = true;
    makePng(600, 500, true);
    uploadToImgur(request => {
      ID('imgur').childNodes[0].nodeValue = 'Upload to imgur';
      ID('imgurpopup').classList.add('show');
      ID('imgurpopuptitle').childNodes[0].nodeValue = 'Imgur upload result';
      if (request && request.success) {
        anbt.unsaved = false;
        ID('imgururl').href = `http://imgur.com/${request.data.id}`;
        ID('imgururl').childNodes[0].nodeValue = 'Uploaded image';
        ID(
          'imgurdelete'
        ).href = `http://imgur.com/delete/${request.data.deletehash}`;
        ID('imgurerror').childNodes[0].nodeValue = '';
        if (window.inForum) {
          window.frameElement.ownerDocument.getElementById(
            'input-comment'
          ).value += `![](http://i.imgur.com/${request.data.id}.png)`;
        }
      } else {
        const error = request.data
          ? `Imgur error: ${request.data.error}`
          : `Error: ${request}`;
        ID('imgurerror').childNodes[0].nodeValue = error;
      }
      ID('imgur').disabled = false;
    });
  }

  function knobCommonMove(event) {
    event.preventDefault();
    const length = getSeekMax();
    let x = event.touches
      ? event.touches[0].pageX - globals.rectangle.left - 34
      : event.pageX - globals.rectangle.left - pageXOffset - 34;
    x = Math.min(Math.max(-10, x), 492);
    const position = Math.round(((x + 10) / 502) * length);
    x = (position / length) * 502 - 10;
    ID('knob').classList.add('smooth');
    ID('knob').style.marginLeft = x + 'px';
    seek(position);
    ID('play').classList.remove('pause');
  }

  function knobCommonUp(event) {
    if (!event.button || (!event.touches && !event.touches.length)) {
      event.preventDefault();
      window.removeEventListener('mouseup', knobCommonUp);
      window.removeEventListener('touchend', knobCommonUp);
      window.removeEventListener('mousemove', knobCommonMove);
      window.removeEventListener('touchmove', knobCommonMove);
    }
  }

  function knobCommonDown(event) {
    if (event.button === 0 || (event.touches && event.touches.length === 1)) {
      globals.rectangle = ID('seekbar').getBoundingClientRect();
      knobCommonMove(event);
      window.addEventListener('mouseup', knobCommonUp);
      window.addEventListener('touchend', knobCommonUp);
      window.addEventListener('mousemove', knobCommonMove);
      window.addEventListener('touchmove', knobCommonMove);
    }
  }

  function knobMove(fraction) {
    const x = Math.floor(fraction * 502 - 10);
    if (fraction > 0) {
      ID('knob').classList.add('smooth');
    } else {
      ID('knob').classList.remove('smooth');
    }
    ID('knob').style.marginLeft = x + 'px';
    if (fraction >= 1) {
      ID('play').classList.remove('pause');
    }
  }

  function noDefault(event) {
    event.preventDefault();
  }

  const paletteMap = {
    default: ['Normal', '#fffdc9'],
    theme_thanksgiving: ['Thanksgiving', '#f5e9ce'],
    halloween: ['Halloween', '#444444'],
    theme_cga: ['CGA', '#ffff55'],
    shades_of_grey: ['Grayscale', '#e9e9e9'],
    theme_bw: ['Black and white', '#ffffff'],
    theme_gameboy: ['Gameboy', '#9bbc0f'],
    theme_neon: ['Neon', '#00abff'],
    theme_sepia: ['Sepia', '#ffe2c4'],
    theme_valentines: ["Valentine's", '#ffccdf'],
    theme_blues: ['the blues', '#295c6f'],
    theme_spring: ['Spring', '#ffffff'],
    theme_beach: ['Beach', '#f7dca2'],
    theme_beach_2: ['Tide Pool', '#2271a2'],
    theme_coty_2016: ['Colors of 2016', '#648589'],
    theme_bee: ['Bee', '#ffffff'],
    theme_coty_2017: ['Colors of 2017', '#5f7278'],
    theme_fire_ice: ['Fire and Ice', '#040526'],
    theme_coty_2018: ['Canyon Sunset', '#2e1b50'],
    theme_juice: ['Juice', '#fced95'],
    theme_tropical: ['Tropical', '#2f0946'],
    theme_grimby_grays: ['Grimby Grays', '#f0efeb'],
    theme_fury_road: ['Fury Road', '#893f1d'],
    theme_candy: ['Candy', '#793abd'],
    theme_holiday_2: ['Holiday', '#f6f6f6'],
    theme_blues_2: ['Blues', '#0f1328'],
    theme_sin_city: ['Sin City', '#000000'],
    theme_lucky_clover: ['Lucky Clover', '#0c442c'],
    theme_drawception: ["D's Exclusive", '#0ee446'],
    theme_retina_burn: ['Retina Burn', '#ff0b11'],
    theme_easter: ['Easter', '#ddf7a8'],
    theme_neapolitan: ['Neapolitan', '#fff7e1'],
    theme_lemonade: ['Lemonade', '#ffebaa'],
    theme_school_pen: ['School Pen', '#fbfcfd'],
    theme_dimmed: ['Dimmed', '#1c0b11'],
    theme_treasure: ['Treasure', '#412a23'],
    theme_witches_brew: ['Witches Brew', '#100b16'],
    theme_wilting_rose: ['Wilting Rose', '#e6c3c3'],
    theme_frosty: ['Frosty', '#f2f3f7'],
    theme_clown_town: ['Clown Town', '#e1f1f2']
  };

  function setPaletteByName(name, customColors) {
    ID('palettename').childNodes[0].nodeValue = name;
    const colors = palettes[name] || customColors;
    anbt.palette = colors;
    const palette = ID('palette');
    const elements = palette.querySelectorAll('b');
    elements.forEach(element => palette.removeChild(element));
    const eraser = elements[elements.length - 1];
    colors.forEach(color => {
      const bElement = document.createElement('b');
      bElement.style.backgroundColor = color;
      bElement.addEventListener('mousedown', colorClick);
      bElement.addEventListener('touchend', colorClick);
      bElement.addEventListener('contextmenu', noDefault);
      palette.appendChild(bElement);
      palette.appendChild(eraser);
    });
  }

  function choosePalette(event) {
    if (event.touches || event.button === 0) {
      event.preventDefault();
      const name = event.currentTarget.childNodes[0].nodeValue;
      anbt.paletteID = event.currentTarget.getAttribute('palette');
      setPaletteByName(name);
    }
  }

  function closePaletteList(event) {
    if (event.touches || event.button === 0) {
      ID('palettechooser').classList.remove('open');
      window.removeEventListener('mousedown', closePaletteList);
      window.removeEventListener('touchend', closePaletteList);
    }
  }

  function openPaletteList(event) {
    if (event.touches || event.button === 0) {
      event.preventDefault();
      const chooser = ID('palettechooser');
      chooser.classList.toggle('open');
      if (chooser.classList.contains('open')) {
        setTimeout(() => {
          window.addEventListener('mousedown', closePaletteList);
          window.addEventListener('touchend', closePaletteList);
        }, 1);
      }
      const paletteNameList = Object.keys(palettes);
      if (chooser.childNodes.length < paletteNameList.length) {
        const canvas = document.createElement('canvas');
        canvas.height = 10;
        const context = canvas.getContext('2d');
        for (
          let i = chooser.childNodes.length;
          i < paletteNameList.length;
          i++
        ) {
          canvas.width = 8 * palettes[paletteNameList[i]].length + 2;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.globalAlpha = 0.5;
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.globalAlpha = 1;
          palettes[paletteNameList[i]].forEach((color, index) => {
            context.fillStyle = color;
            context.fillRect(index * 8 + 1, 1, 8, 8);
          });
          const div = document.createElement('div');
          div.appendChild(document.createTextNode(paletteNameList[i]));
          for (let [paletteID, value] of Object.entries(paletteMap)) {
            if (value[0] === paletteNameList[i])
              div.setAttribute('palette', paletteID);
          }
          div.style.backgroundImage = `url("${canvas.toDataURL()}")`;
          div.style.backgroundRepeat = 'no-repeat';
          div.style.backgroundPosition = 'center 35px';
          div.addEventListener('mousedown', choosePalette);
          div.addEventListener('touchend', choosePalette);
          chooser.appendChild(div);
        }
      }
    }
  }

  function popupClose(event) {
    event.preventDefault();
    event.currentTarget.parentElement.classList.remove('show');
  }

  function svgContextMenu(event) {
    event.preventDefault();
  }

  function checkPlayingAndStop() {
    if (!anbt.isPlaying) return false;
    pause();
    ID('play').classList.remove('pause');
    return true;
  }

  function windowMouseMove(event) {
    event.preventDefault();
    if (!anbt.isStroking) return;
    const x = event.pageX - globals.rectangle.left - pageXOffset;
    const y = event.pageY - globals.rectangle.top - pageYOffset;
    strokeAdd(x, y);
  }

  function mouseUp(event) {
    const { options } = window;
    if (event.button === 0 || event.button === 2) {
      event.preventDefault();
      if (anbt.isStroking) strokeEnd();
      if (event.buttons & 3) {
        const lastPoint = anbt.points[anbt.points.length - 1];
        let button = event.button === 0;
        strokeBegin(lastPoint.x, lastPoint.y, button);
      } else {
        if (options.hideCross) {
          ID('svgContainer').classList.remove('hidecursor');
        }
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener('mousemove', windowMouseMove);
      }
    }
  }

  const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
  function mouseDown(event) {
    const { options } = window;
    if (event.button === MOUSE.LEFT || event.button === MOUSE.RIGHT) {
      if (anbt.isStroking) return mouseUp(event);
      if (checkPlayingAndStop()) return;
      event.preventDefault();
      globals.rectangle = event.currentTarget.getBoundingClientRect();
      const x = event.pageX - globals.rectangle.left - pageXOffset;
      const y = event.pageY - globals.rectangle.top - pageYOffset;
      if (anbt.eyedropperActive) {
        let primary = event.button === MOUSE.LEFT ? 0 : 1;
        setColor(primary, eyedropper(x, y));
        updateColorIndicators();
        if (!event.altKey) {
          anbt.eyedropperActive = false;
          ID('svgContainer').classList.remove('hidecursor');
          showEyedropperCursor(false);
        }
      } else {
        const left = event.button === MOUSE.LEFT;
        const eraser = !(getPointerType() !== 3);
        if (options.hideCross) ID('svgContainer').classList.add('hidecursor');
        strokeBegin(x, y, left, eraser);
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', windowMouseMove);
      }
    }
  }

  function mouseLeave() {
    moveCursor(-100, -100);
  }

  function svgMouseMove(event) {
    const { options } = window;
    globals.rectangle = event.currentTarget.getBoundingClientRect();
    const x = event.pageX - globals.rectangle.left - pageXOffset;
    const y = event.pageY - globals.rectangle.top - pageYOffset;
    moveCursor(x, y);
    if (options.colorUnderCursorHint && !anbt.isStroking) {
      const color = eyedropper(x, y);
      if (globals.lastSeenColorToHighlight !== color) {
        const element = ID('colors').querySelector('b.hint');
        if (element) element.classList.remove('hint');
        const colorIndex = anbt.palette.indexOf(color);
        if (colorIndex >= 0) {
          const elements = ID('colors').querySelectorAll('b');
          elements[colorIndex].classList.add('hint');
        }
      }
      globals.lastSeenColorToHighlight = color;
    }
  }

  function simulateSingleTouchStart() {
    if (!globals.touchSingle) return;
    const x = globals.lastTouch.pageX - globals.rectangle.left;
    const y = globals.lastTouch.pageY - globals.rectangle.top;
    strokeBegin(x, y, true);
    globals.touchSingle = false;
  }

  function touchMove(event) {
    if (event.touches.length !== 1) return;
    simulateSingleTouchStart();
    event.preventDefault();
    if (!anbt.isStroking) return;
    const x = event.touches[0].pageX - globals.rectangle.left;
    const y = event.touches[0].pageY - globals.rectangle.top;
    strokeAdd(x, y);
  }

  function touchEnd(event) {
    if (event.touches.length !== 0) return;
    simulateSingleTouchStart();
    event.preventDefault();
    window.removeEventListener('touchend', touchEnd);
    window.removeEventListener('touchmove', touchMove);
    strokeEnd();
  }

  function touchUndoRedo(event) {
    if (event.changedTouches.length === 1 && event.touches.length === 1) {
      const { pageX, pageY } = event.changedTouches[0];
      if (
        Math.abs(pageX - globals.lastTouch.pageX) < 10 &&
        Math.abs(pageY - globals.lastTouch.pageY) < 10
      ) {
        ID('play').classList.remove('pause');
        if (pageX < event.touches[0].pageX) undo();
        else redo();
      }
    }
    window.removeEventListener('touchend', touchUndoRedo);
  }

  function touchStart(event) {
    if (event.touches.length === 1) {
      if (checkPlayingAndStop()) return;
      globals.rectangle = event.currentTarget.getBoundingClientRect();
      globals.touchSingle = true;
      globals.lastTouch = event.touches[0];
      window.addEventListener('touchend', touchEnd);
      window.addEventListener('touchmove', touchMove);
    } else {
      if (globals.touchSingle && event.touches.length === 3) {
        globals.lastTouch = event.touches[1];
        window.addEventListener('touchend', touchUndoRedo);
      }
      globals.touchSingle = false;
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('touchmove', touchMove);
      if (anbt.isStroking) strokeEnd();
    }
  }

  function beforeUnload(event) {
    if (!anbt.unsaved) return;
    const message = "You haven't saved the drawing. Abandon?";
    event.returnValue = message;
    return message;
  }

  function windowContextMenu(event) {
    if (anbt.isStroking) event.preventDefault();
  }

  function error(event) {
    alert(event);
  }

  let scale = 0;
  let shift = null;
  function mouseWheel(event) {
    if (anbt.isFocused) {
      event.preventDefault();
      shift = shift ?? scale;
      scale += event.deltaY * -0.02;
      let delta = shift + scale;
      let step = Math.min(Math.max(delta, -1), 1);
      console.log(scale, shift, step, event);
      if (Math.abs(step) === 1) {
        scale = 0;
        shift = scale;
        softModifyBrushSize(step);
      }
    }
  }

  function bindEvents() {
    document.addEventListener('mousemove', trackFocus);
    document.addEventListener('wheel', mouseWheel);
    ID('svgContainer').addEventListener('mousedown', mouseDown);
    ID('svgContainer').addEventListener('mousemove', svgMouseMove);
    ID('svgContainer').addEventListener('touchstart', touchStart);
    ID('svgContainer').addEventListener('mouseleave', mouseLeave);
    ID('svgContainer').addEventListener('contextmenu', svgContextMenu);
    ID('import').addEventListener('click', doImport);
    ID('export').addEventListener('click', doExport);
    ID('imgur').addEventListener('click', exportToImgur);
    ID('drawception').addEventListener('click', exportToDrawception);
    document.querySelectorAll('.brush').forEach((brush, index) => {
      brush.classList.add(`size-${globals.brushSizes[index]}`);
      brush.addEventListener('mousedown', changeBrushSize);
      brush.addEventListener('click', changeBrushSize);
    });
    ID('colors')
      .querySelectorAll('b')
      .forEach(color => {
        color.addEventListener('mousedown', colorClick);
        color.addEventListener('touchend', colorClick);
        color.addEventListener('contextmenu', noDefault);
      });
    ID('setbackground').addEventListener('click', clickSetBackground);
    ID('undo').addEventListener('click', clickUndo);
    ID('redo').addEventListener('click', clickRedo);
    ID('trash').addEventListener('click', clickTrash);
    setSeekbarMove(knobMove);
    ID('knob').addEventListener('mousedown', knobCommonDown);
    ID('knob').addEventListener('touchstart', knobCommonDown);
    ID('seekbar').addEventListener('mousedown', knobCommonDown);
    ID('seekbar').addEventListener('touchstart', knobCommonDown);
    ID('play').addEventListener('mousedown', playCommonDown);
    ID('play').addEventListener('touchstart', playCommonDown);
    ID('palettename').addEventListener('mousedown', openPaletteList);
    ID('palettename').addEventListener('touchend', openPaletteList);
    ID('imgurpopupclose').addEventListener('click', popupClose);
    ID('drawceptionpopupclose').addEventListener('click', popupClose);
    document.addEventListener('keyup', keyUp);
    document.addEventListener('keydown', keyDown);
    window.addEventListener('contextmenu', windowContextMenu);
    window.addEventListener('error', error);
    window.addEventListener('beforeunload', beforeUnload);
  }

  function fixTabletPluginGoingAwol() {
    const stupidPlugin = ID('wacom');
    const container = ID('wacomContainer');
    window.onblur = () => {
      if (container.childNodes.length === 1)
        container.removeChild(stupidPlugin);
    };
    window.onfocus = () => {
      if (container.childNodes.length === 0)
        container.appendChild(stupidPlugin);
    };
  }

  function ajax(type, url, params) {
    const { options } = window;
    const request = new XMLHttpRequest();
    request.open(type, url);
    if (params.header)
      request.setRequestHeader(params.header[0], params.header[1]);
    params.retry = 5;
    request.timeout = 15000;
    request.ontimeout = () => {
      if (params.retry > 0) {
        if (!options.retryEnabled) return;
        document.body.style.cursor = 'progress';
        params.retry--;
        ajax(type, url, params);
      } else {
        document.body.style.cursor = '';
        params.error();
      }
    };
    request.onload = () => {
      if (
        url === '/play/skip.json' &&
        request.error === 'Sorry, but we couldn\u0027t find your current game.'
      ) {
        location.reload();
        return;
      }
      if (
        url === '/play/exit.json' &&
        request.error === 'Sorry, but we couldn\u0027t find your current game.'
      ) {
        location.pathname = '/';
        return;
      }
      params.load(request.responseText);
    };
    request.onerror = () => {
      if (params.error) {
        params.error(request);
      } else {
        params.load(request);
      }
    };
    if (params.obj) {
      request.send(JSON.stringify(params.obj));
    } else {
      request.send();
    }
    document.body.style.cursor = '';
    return;
  }

  function backToForum(event) {
    event.preventDefault();
    window.frameElement.ownerDocument.querySelector(
      '.v--modal-overlay'
    ).outerHTML = '';
  }

  function decodeHTML(html) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  }

  function bookmark() {
    const { getLocalStorageItem } = window;
    ID('bookmark').disabled = true;
    const games = getLocalStorageItem('gpe_gameBookmarks', {});
    const caption = window.gameInfo.caption;
    games[window.gameInfo.gameId] = {
      time: Date.now(),
      caption: caption ? decodeHTML(caption) : ''
    };
    localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games));
  }

  function caption(event) {
    if (event.keyCode !== 13) return;
    event.preventDefault();
    ID('submitcaption').click();
  }

  function updateTimer() {
    let seconds = (globals.timerStart - Date.now()) / 1000;
    try {
      if (window.timerCallback) window.timerCallback(seconds);
    } catch (e) {}
    seconds = Math.abs(seconds);
    const minutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    seconds = `0${Math.floor(seconds % 60)}`.slice(-2);
    ID('timer').childNodes[0].nodeValue = `${minutes}:${seconds}`;
  }

  function exitToSandbox() {
    const { inContest, gameInfo, drawingAborted, versionTitle } = window;
    if (inContest && !drawingAborted) {
      ajax('POST', '/contests/exit.json', {
        load: () => alert('You have missed your contest.')
      });
    }
    if (gameInfo.drawFirst && !drawingAborted) {
      ajax('POST', '/play/abort-start.json', {
        obj: {
          game_token: gameInfo.gameId
        },
        load: () =>
          alert('You have missed your Draw First game.\nIt has been aborted.'),
        error: () =>
          alert(
            'You have missed your Draw First game.\nI tried aborting it, but an error occured. :('
          )
      });
    }
    globals.timerStart = Date.now();
    ID('newcanvasyo').className = 'sandbox';
    window.timerCallback = () => {};
    updateTimer();
    document.title = 'Sandbox - Drawception';
    ID('gamemode').innerHTML = 'Sandbox';
    ID('headerinfo').innerHTML = `Sandbox with ${versionTitle}`;
    try {
      history.replaceState({}, null, '/sandbox/');
    } catch (e) {}
    unlock();
  }

  function exit() {
    const { gameInfo, inContest } = window;
    if (inContest) {
      if (!confirm('Quit the contest? Entry coins will be lost!')) return;
      ID('exit').disabled = true;
      ajax('POST', '/contests/exit.json', {
        load: () => {
          ID('exit').disabled = false;
          window.drawingAborted = true;
          exitToSandbox();
          location.pathname = '/contests/';
        },
        error: () => {
          ID('exit').disabled = false;
          alert('Server error. :( Try again?');
        }
      });
      return;
    }
    if (gameInfo.drawFirst) {
      if (!confirm('Abort creating a draw first game?')) return;
      ID('exit').disabled = true;
      ajax('POST', '/play/abort-start.json', {
        obj: {
          game_token: gameInfo.gameId
        },
        load: () => {
          ID('exit').disabled = false;
          window.drawingAborted = true;
          exitToSandbox();
          location.pathname = '/create/';
        },
        error: () => {
          ID('exit').disabled = false;
          alert('Server error. :( Try again?');
        }
      });
      return;
    }
    if (!confirm('Really exit?')) return;
    ID('exit').disabled = true;
    ajax('POST', '/play/exit.json', {
      obj: {
        game_token: gameInfo.gameId
      },
      load: () => {
        ID('exit').disabled = false;
        exitToSandbox();
      }
    });
  }

  function quit(event) {
    event.preventDefault();
    window.top.location.href = 'https://drawception.com/';
  }

  function extractInfoFromHTML(html) {
    const doc = document.implementation.createHTMLDocument('');
    doc.body.innerHTML = html;
    const drawapp = doc.querySelector('draw-app-svg') ||
      doc.querySelector('describe') || {
        getAttribute: () => false
      };
    const getElement = query => doc.querySelector(query);
    return {
      error: (element => (element ? element.src : false))(getElement('.error')),
      gameId: drawapp.getAttribute('game_token'),
      blitz: drawapp.getAttribute(':blitz_mode') === 'true',
      friend: drawapp.getAttribute(':game_public') !== 'true',
      drawFirst: drawapp.getAttribute(':draw_first') === 'true',
      timeLeft: parseInt(drawapp.getAttribute(':seconds'), 10),
      caption: drawapp.getAttribute('phrase'),
      image: drawapp.getAttribute('img_url'),
      palette: drawapp.getAttribute('theme_id'),
      backgroundButton: drawapp.getAttribute(':bg_layer') === 'true',
      playerUrl: '/profile/',
      avatar: null,
      coins: '-',
      publicGames: '-',
      friendGames: '-',
      notifications: '-',
      drawingLink: (element => (element ? element.src : false))(
        getElement('.gamepanel img')
      ),
      drawingByLink: (element =>
        element ? [element.textContent.trim(), element.href] : false)(
        getElement('#main p a')
      ),
      drawnCaption: (element => (element ? element.src : false))(
        getElement('h1.game-title')
      ),
      notLoggedIn: getElement('form.form-login') !== null,
      limitReached: false,
      html
    };
  }

  function getPalData(palette) {
    if (palette === 'theme_roulette') {
      alert(
        "Warning: Drawception roulette didn't give a theme. ANBT will choose a random palette."
      );
      delete palettes.Roulette;
      const keys = Object.keys(paletteMap);
      const paletteName = keys[(keys.length * Math.random()) << 0];
      palettes.Roulette = palettes[paletteMap[paletteName][0]];
      return ['Roulette', paletteMap[paletteName][1]];
    } else {
      if (palette) return paletteMap[palette.toLowerCase()];
    }
  }

  function handleCommonParameters() {
    const { gameInfo, inForum } = window;
    if (gameInfo.notLoggedIn) {
      return (ID('start').parentNode.innerHTML =
        '<a href="/login" class="headerbutton active">Login</a> <a href="/register" class="headerbutton active">Register</a>');
    }
    if (gameInfo.avatar) ID('infoavatar').src = gameInfo.avatar;
    ID('infoprofile').href = gameInfo.playerUrl;
    ID('infocoins').innerHTML = gameInfo.coins;
    ID('infogames').innerHTML = gameInfo.publicGames;
    ID('infofriendgames').innerHTML = gameInfo.friendGames || 0;
    ID('infonotifications').innerHTML = gameInfo.notifications;
    if (inForum) document.querySelector('.headerright').hidden = true;
  }

  function timerCallback(seconds) {
    const { gameInfo } = window;
    if (seconds < 1) {
      document.title = "[TIME'S UP!] Playing Drawception";
      if (gameInfo.image || window.timesUp) {
        if (!window.submitting) {
          if (gameInfo.image) {
            getParametersFromPlay();
          } else {
            exitToSandbox();
          }
        }
      } else {
        ID('newcanvasyo').classList.add('locked');
        lock();
        globals.timerStart += 15000;
        updateTimer();
        window.timesUp = true;
      }
    } else {
      document.title = `[${`0${Math.floor(seconds / 60)}`.slice(
        -2
      )}:${`0${Math.floor(seconds % 60)}`.slice(-2)}] Playing Drawception`;
    }
    if (
      window.alarm &&
      !window.playedWarningSound &&
      seconds <= (gameInfo.blitz ? 5 : 61) &&
      seconds > 0
    ) {
      window.alarm.play();
      window.playedWarningSound = true;
    }
  }

  function handlePlayParameters() {
    const { options, gameInfo, inContest, versionTitle } = window;
    ID('skip').disabled = gameInfo.drawFirst || inContest;
    ID('report').disabled = gameInfo.drawFirst || inContest;
    ID('exit').disabled = false;
    ID('start').disabled = false;
    ID('bookmark').disabled = gameInfo.drawFirst || inContest;
    ID('options').disabled = true;
    ID('timeplus').disabled = inContest;
    ID('submit').disabled = false;
    ID('headerinfo').innerHTML = `Playing with ${versionTitle}`;
    ID('drawthis').classList.add('onlyplay');
    ID('emptytitle').classList.remove('onlyplay');
    window.submitting = false;
    window.drawingAborted = false;
    if (gameInfo.error) {
      alert(`Play Error:\n${gameInfo.error}`);
      return exitToSandbox();
    }
    if (gameInfo.limitReached) {
      alert('Play limit reached!');
      return exitToSandbox();
    }
    ID('gamemode').innerHTML = inContest
      ? 'Contest'
      : `${gameInfo.friend ? 'Friend ' : 'Public '} safe for work ${
          gameInfo.blitz ? 'BLITZ ' : ''
        }Game`;
    ID('drawthis').innerHTML =
      gameInfo.caption || (gameInfo.drawFirst && '(Start your game!)') || '';
    ID('tocaption').src = '';
    const newCanvas = ID('newcanvasyo');
    newCanvas.className = 'play';
    if (gameInfo.friend) newCanvas.classList.add('friend');
    ID('palettechooser').className = gameInfo.friend ? '' : 'onlysandbox';
    if (gameInfo.blitz) newCanvas.classList.add('blitz');
    newCanvas.classList.add(gameInfo.image ? 'captioning' : 'drawing');
    if (anbt.isStroking) strokeEnd();
    unlock();
    for (let i = anbt.svg.childNodes.length - 1; i > 0; i--) {
      anbt.svg.removeChild(anbt.svg.childNodes[i]);
    }
    seek(0);
    moveSeekbar(1);
    anbt.unsaved = false;
    const { palette } = gameInfo;
    if (!gameInfo.image) {
      const paletteData = getPalData(palette);
      if (!paletteData) {
        if (!palette) {
          alert(
            'Error, please report! Failed to extract the palette.\nAre you using the latest ANBT version?'
          );
        } else {
          alert(
            `Error, please report! Unknown palette: '${palette}'.\nAre you using the latest ANBT version?`
          );
        }
        lock();
        ID('submit').disabled = true;
      } else {
        setPaletteByName(paletteData[0]);
        setBackground(paletteData[1]);
        anbt.colors = [palettes[paletteData[0]][0], 'eraser'];
        updateColorIndicators();
      }
      ID('setbackground').hidden = !gameInfo.backgroundButton;
    } else {
      ID('tocaption').src =
        gameInfo.image.length <= 30
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAD6AQMAAAAho+iwAAAABlBMVEWAQED///94jotxAAABiklEQVR4Xu3W0UrCUBjA8eOO5CLK7VxLzDWFrjK6Eaha8FHuppfwBRJvdjlMIK/K3qA3OZBBd/UIm9UL2O2inMJBptNuog/6/h4Q2Y8J387Y2KIoiqIoiqIoiuIxXnbI5cmXSiJjD3LmFyrGY46PqVAx/HPDv9/w3wsJTTgapuDkcEIQMFxzo937S8+F5OkWI2IKymQl3yiZ6j8zYsRY6vUYDcOfGkuMknE5/aQAMczX9O+iKIrKJWuSxliQqT61hOmMucsYK6uzLWfDenF34EXhOX+s377KLCZcs1bxhNXQqnAvrExWM8vvY3amORCNsplu2nZPWKdj1tecTHZZLA97ZnjBB/XrkWIZWT+bsmTowp+7FHSnyMi7CpuMrWcwNsMMxnJzrCUbwwq/2/MLJb8lP4L2zVHJ35Bp1rE8Uc2bALoNHQvcoNG3Yf5Pm6EnHG50Ye0YmiG4V08LmWD7wmF9gJwFgoHbnZzNSDE/Co3orSB2YGsbovAgaD9vlkB/WbkbdQVWMNxR1Ddnf4eSZpHZYAAAAABJRU5ErkJggg=='
          : gameInfo.image;
      ID('caption').value = '';
      ID('caption').focus();
      ID('caption').setAttribute('maxlength', 45);
      ID('usedchars').textContent = '45';
    }
    if (
      (options.timeOutSound && !gameInfo.blitz) ||
      (options.timeOutSoundBlitz && gameInfo.blitz)
    ) {
      window.playedWarningSound = false;
      window.alarm = new Audio(window.alarmSoundOgg);
      window.alarm.volume = options.timeOutSoundVolume / 100;
    }
    globals.timerStart = Date.now() + 1000 * gameInfo.timeLeft;
    window.timerCallback = timerCallback;
    handleCommonParameters();
    window.timesUp = false;
    updateTimer();
  }

  function getParametersFromPlay() {
    const { inContest, friendGameId } = window;
    const url = inContest
      ? '/contests/play/'
      : `/play/${friendGameId ? `${friendGameId}/` : ''}`;
    try {
      if (location.pathname !== url) history.replaceState({}, null, url);
    } catch (e) {}
    ajax('GET', `${url}?${Date.now()}`, {
      load: response => {
        window.gameInfo = response
          ? extractInfoFromHTML(response)
          : {
              error: 'Server returned a blank response :('
            };
        handlePlayParameters();
      },
      error: response => {
        window.gameInfo = {
          error: `Server error: ${response.statusText}`
        };
        handlePlayParameters();
      }
    });
  }

  function report() {
    if (!confirm('Report this panel?')) return;
    ajax('POST', '/play/flag.json', {
      obj: {
        game_token: window.gameInfo.gameId
      },
      load: () => {
        ID('report').disabled = false;
        getParametersFromPlay();
      }
    });
  }

  function unsavedStopAction() {
    return anbt.unsaved && !confirm("You haven't saved the drawing. Abandon?");
  }

  function skip() {
    if (unsavedStopAction()) return;
    ID('skip').disabled = true;
    ajax('POST', '/play/skip.json', {
      obj: {
        game_token: window.gameInfo.gameId
      },
      load: () => getParametersFromPlay(),
      error: () => {
        ID('skip').disabled = false;
        getParametersFromPlay();
      }
    });
  }

  function start() {
    if (unsavedStopAction()) return;
    ID('start').disabled = true;
    getParametersFromPlay();
  }

  function onCaptionSuccess(title) {
    const { options, gameInfo } = window;
    if (!options.bookmarkOwnCaptions) return;
    const games = window.getLocalStorageItem('gpe_gameBookmarks', {});
    games[gameInfo.gameId] = {
      time: Date.now(),
      caption: `"${title}"`,
      own: true
    };
    localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games));
  }

  function submitCaption() {
    const { inContest, gameInfo } = window;
    const title = ID('caption').value;
    if (!title) {
      ID('caption').focus();
      return alert("You haven't entered a caption!");
    }
    window.submitting = true;
    ID('submitcaption').disabled = true;
    const url = inContest
      ? '/contests/submit-caption.json'
      : '/play/describe.json';
    ajax('POST', url, {
      obj: {
        game_token: gameInfo.gameId,
        title
      },
      load: response => {
        try {
          response = JSON.parse(response);
        } catch (e) {
          response = {
            error: response
          };
        }
        if (response.error) {
          ID('submitcaption').disabled = false;
          if (typeof response.error === 'object') {
            alert(
              `Error! Please report this data:\ngame: ${
                gameInfo.gameId
              }\n\nresponse: \n${JSON.stringify(response.error)}`
            );
          } else {
            alert(response.error);
          }
        } else if (response.message) {
          ID('submitcaption').disabled = false;
          alert(response.message);
        } else if (response.url) {
          onCaptionSuccess(title);
          anbt.unsaved = false;
          location.replace(response.url);
        }
      },
      error: () => {
        ID('submitcaption').disabled = false;
        alert('Server error. :( Try again?');
      }
    });
  }

  function submitDrawing() {
    const { inContest, gameInfo, options, pako } = window;
    const moreThanMinuteLeft = globals.timerStart - Date.now() > 60000;
    if (
      options.submitConfirm &&
      moreThanMinuteLeft &&
      !confirm('Ready to submit this drawing?')
    )
      return;
    ID('submit').disabled = true;
    makePng(300, 250, true);
    if (options.backup) {
      localStorage.setItem('anbt_drawingbackup_newcanvas', anbt.pngBase64);
    }
    window.submitting = true;
    const url = inContest ? '/contests/submit-drawing.json' : '/play/draw.json';
    const pathList = [...anbt.svg.childNodes].filter(
      childNode => childNode.nodeName === 'path'
    );
    const base = {
      v: 1,
      w: 600,
      h: 500,
      t: 0,
      th: gameInfo.palette,
      bg: anbt.background,
      p: 1,
      s: 0.7,
      actions: formatDrawingData(pathList)
    };
    const drawdata = btoa(
      pako
        .gzip(JSON.stringify(base))
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    ajax('POST', url, {
      obj: {
        game_token: gameInfo.gameId,
        drawdata
      },
      load: response => {
        try {
          response = JSON.parse(response);
        } catch (e) {
          response = {
            error: response
          };
        }
        if (response.error) {
          ID('submit').disabled = false;
          if (typeof response.error === 'object') {
            alert(
              `Error! Please report this data:\ngame: ${
                gameInfo.gameId
              }\n\nresponse:\n${JSON.stringify(response.error)}`
            );
          } else {
            alert(response.error);
          }
        } else if (response.message) {
          ID('submit').disabled = false;
          alert(response.message);
        } else if (response.url) {
          window.onbeforeunload = () => {};
          anbt.unsaved = false;
          location.replace(response.url);
        }
      },
      error: () => {
        ID('submit').disabled = false;
        alert('Server error. :( Try again?');
      }
    });
  }

  function timePlus() {
    let { gameInfo } = window;
    if (!gameInfo.friend) return;
    ID('timeplus').disabled = true;
    ajax('POST', '/play/exit.json', {
      obj: {
        game_token: gameInfo.gameId
      },
      load: () => {
        ajax('GET', `/play/${gameInfo.gameId}/?${Date.now()}`, {
          load: response => {
            ID('timeplus').disabled = false;
            gameInfo = response
              ? extractInfoFromHTML(response)
              : {
                  error: 'Server returned a blank response :('
                };
            globals.timerStart = Date.now() + 1000 * gameInfo.timeLeft;
          },
          error: () => {
            ID('timeplus').disabled = false;
            alert('Server error. :( Try again?');
          }
        });
      },
      error: () => {
        ID('timeplus').disabled = false;
        alert('Server error. :( Try again?');
      }
    });
  }

  function updateUsedChars() {
    ID('usedchars').textContent = 45 - ID('caption').value.length;
  }

  function bindCanvasEvents() {
    const { options, inForum } = window;
    if (inForum) {
      ID('quit').addEventListener('click', quit);
      const backForum = document.createElement('button');
      backForum.href = '/';
      backForum.setAttribute('class', 'submit exit');
      backForum.title = 'Exit';
      backForum.textContent = 'Exit';
      backForum.addEventListener('click', backToForum);
      ID('submit').parentNode.insertBefore(backForum, ID('submit').nextSibling);
    }
    ID('exit').addEventListener('click', exit);
    ID('skip').addEventListener('click', skip);
    ID('start').addEventListener('click', start);
    ID('report').addEventListener('click', report);
    ID('bookmark').addEventListener('click', bookmark);
    ID('submit').addEventListener('click', submitDrawing);
    ID('submitcaption').addEventListener('click', submitCaption);
    if (options.enterToCaption)
      ID('caption').addEventListener('keydown', caption);
    ID('caption').addEventListener('change', updateUsedChars);
    ID('caption').addEventListener('keydown', updateUsedChars);
    ID('caption').addEventListener('input', updateUsedChars);
    ID('timeplus').addEventListener('click', timePlus);
  }

  function handleSandboxParameters() {
    const { gameInfo, versionTitle, options } = window;
    if (gameInfo.drawingByLink) {
      const [playerName, playerLink] = gameInfo.drawingByLink;
      const replayLink = `<a href="http://grompe.org.ru/drawit/#drawception/${location.hash.substr(
        1
      )}" title="Public replay link for sharing">Drawing</a>`;
      ID(
        'headerinfo'
      ).innerHTML = `${replayLink} by <a href="${playerLink}">${playerName}</a>`;
      document.title = `${playerName}'s drawing - Drawception`;
      if (gameInfo.drawnCaption) {
        ID('drawthis').innerHTML = `"${gameInfo.drawnCaption}"`;
        ID('drawthis').classList.remove('onlyplay');
        ID('emptytitle').classList.add('onlyplay');
      }
      if (options.autoPlay) play();
    } else {
      ID('headerinfo').innerHTML = `Sandbox with ${versionTitle}`;
      ID('drawthis').classList.add('onlyplay');
    }
    handleCommonParameters();
  }

  function needToGoDeeper() {
    const { options, inSandbox, panelId, paletteInfo } = window;
    window.onerror = (error, file, line) => {
      if (error.toString().includes('periodsToSeconds')) return;
      if (error.toString().match(/script error/i)) return;
      alert(line ? `${error}\nline: ${line}` : error);
    };
    if (options.newCanvasCSS) {
      const parent =
        document.getElementsByTagName('head')[0] || document.documentElement;
      const style = document.createElement('style');
      style.type = 'text/css';
      const textNode = document.createTextNode(options.newCanvasCSS);
      style.appendChild(textNode);
      parent.appendChild(style);
    }
    if (options.enableWacom) {
      const stupidPlugin = document.createElement('object');
      const container = ID('wacomContainer');
      stupidPlugin.setAttribute('id', 'wacom');
      stupidPlugin.setAttribute('type', 'application/x-wacomtabletplugin');
      stupidPlugin.setAttribute('width', '1');
      stupidPlugin.setAttribute('height', '1');
      container.appendChild(stupidPlugin);
      if (options.fixTabletPluginGoingAWOL) fixTabletPluginGoingAwol();
    }
    bindCanvasEvents();
    if (inSandbox) {
      if (panelId) {
        ajax('GET', `/panel/drawing/${panelId}/-/`, {
          load: response => {
            window.gameInfo = extractInfoFromHTML(response);
            fromUrl(`${window.gameInfo.drawingLink}?anbt`);
            handleSandboxParameters();
          },
          error: () => {
            alert('Error loading the panel page. Please try again.');
          }
        });
      } else {
        ajax('GET', '/sandbox/', {
          load: response => {
            window.gameInfo = extractInfoFromHTML(response);
            handleSandboxParameters();
          },
          error: () => {}
        });
        if (options.backup) {
          const pngdata = localStorage.getItem('anbt_drawingbackup_newcanvas');
          if (pngdata) {
            fromPng(base64ToBytes(pngdata.substr(22)).buffer);
            localStorage.removeItem('anbt_drawingbackup_newcanvas');
          }
        }
      }
      if (paletteInfo) {
        const palette = paletteInfo.split(',').map(color => `#${color}`);
        setPaletteByName('Custom', palette);
        setBackground(palette[palette.length - 1]);
        anbt.colors = [palette[0], 'eraser'];
        updateColorIndicators();
      }
    } else {
      ID('newcanvasyo').className = 'play';
      getParametersFromPlay();
    }
    if (/iPad|iPhone/.test(navigator.userAgent)) anbt.fastUndoLevels = 3;
    window.$ = () => {
      alert(
        'Some additional script conflicts with ANBT new canvas, please disable it.'
      );
      window.$ = null;
      throw new Error('Script conflict with ANBT new canvas');
    };
  }

  window.needToGoDeeper = needToGoDeeper;
  if (!window.options) window.options = {};
  anbt.bindContainer(ID('svgContainer'));
  bindEvents();
  globals.timerStart = Date.now();
  setInterval(updateTimer, 500);
  if (window.anbtReady) window.anbtReady();
})();
